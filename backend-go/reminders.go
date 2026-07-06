package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/robfig/cron/v3"
)

var (
	scheduler = cron.New()
	tokens    []string
	mu        sync.Mutex
)

var (
	fcmProject = os.Getenv("FCM_PROJECT_ID")
	fcmKey     = os.Getenv("FCM_SERVER_KEY")
)

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var body struct {
		FCMToken string `json:"fcm_token"`
	}
	json.NewDecoder(r.Body).Decode(&body)
	if body.FCMToken == "" {
		http.Error(w, "fcm_token obrigatório", 400)
		return
	}

	mu.Lock()
	tokens = append(tokens, body.FCMToken)
	isFirst := len(tokens) == 1
	mu.Unlock()

	if isFirst {
		scheduler.AddFunc("0 7 * * *", func() { notifyAll("Hora da rotina da manhã", "Comece seu skincare matinal") })
		scheduler.AddFunc("0 21 * * *", func() { notifyAll("Hora da rotina da noite", "Comece seu skincare noturno") })
		scheduler.Start()
	}

	w.WriteHeader(http.StatusOK)
}

func notifyAll(title, body string) {
	mu.Lock()
	defer mu.Unlock()
	for _, token := range tokens {
		sendFCM(token, title, body)
	}
}

func sendFCM(token, title, body string) {
	payload, _ := json.Marshal(map[string]any{
		"message": map[string]any{
			"token":        token,
			"notification": map[string]string{"title": title, "body": body},
		},
	})

	req, _ := http.NewRequest("POST",
		"https://fcm.googleapis.com/v1/projects/"+fcmProject+"/messages:send",
		bytes.NewReader(payload))
	req.Header.Set("Authorization", "Bearer "+fcmKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("[FCM] erro: %v", err)
		return
	}
	defer resp.Body.Close()
	log.Printf("[FCM] enviado para %s... status=%d", token[:10], resp.StatusCode)
}
