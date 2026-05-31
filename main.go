package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file, using environment variables")
	}

	projectID := os.Getenv("FIREBASE_PROJECT_ID")
	flaskURL := os.Getenv("FLASK_BACKEND_URL")
	port := os.Getenv("PORT")

	if projectID == "" {
		log.Fatal("FIREBASE_PROJECT_ID not set")
	}
	if port == "" {
		port = "8080"
	}

	proxyHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		targetURL := flaskURL + r.URL.Path

		req, err := http.NewRequest(r.Method, targetURL, r.Body)
		if err != nil {
			http.Error(w, "proxy error", http.StatusInternalServerError)
			return
		}

		for key, values := range r.Header {
			for _, v := range values {
				req.Header.Add(key, v)
			}
		}

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			http.Error(w, "failed to reach Flask: "+err.Error(), http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()

		w.WriteHeader(resp.StatusCode)
		io.Copy(w, resp.Body)
	})

	protected := FirebaseAuth(projectID, proxyHandler)

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(w, "Go gateway running")
	})

	http.Handle("/", protected)

	fmt.Printf("Gateway running on :%s → Flask at %s\n", port, flaskURL)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
