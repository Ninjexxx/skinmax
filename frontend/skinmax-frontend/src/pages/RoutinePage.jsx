import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { auth } from "../Firebase";

import "../styles/routinePage.css";

export default function RoutinePage() {
  const [routine, setRoutine] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchLatestRoutine();
  }, []);

  const fetchLatestRoutine =
    async () => {
      try {
        const user =
          auth.currentUser;

        if (!user) return;

        const token =
          await user.getIdToken();

        const response =
          await fetch(
            "http://127.0.0.1:5000/api/history",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        if (
          data.scans &&
          data.scans.length > 0
        ) {
          setRoutine(
            data.scans[0].advice
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const morning =
    routine?.routine_am || [];

  const evening =
    routine?.routine_pm || [];

  const lifestyle =
    routine?.lifestyle || [];

  return (
    <div className="layout">
      <Sidebar />

      <main className="routine-content">

        <div className="routine-header">
          <h1>
            Rotina personalizada
          </h1>

          <p>
            Gerada a partir da sua
            análise de pele mais recente.
          </p>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div className="routine-grid">

              <div className="routine-card">
                <h2>
                  Rotina da manhã
                </h2>

                {morning.length ===
                0 ? (
                  <p>
                    Nenhuma recomendação
                    matinal.
                  </p>
                ) : (
                  morning.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="routine-step"
                      >
                        <strong>
                          Passo{" "}
                          {index +
                            1}
                        </strong>

                        <p>
                          {item}
                        </p>
                      </div>
                    )
                  )
                )}
              </div>

              <div className="routine-card">
                <h2>
                  Rotina da noite
                </h2>

                {evening.length ===
                0 ? (
                  <p>
                    Nenhuma recomendação
                    noturna.
                  </p>
                ) : (
                  evening.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="routine-step"
                      >
                        <strong>
                          Passo{" "}
                          {index +
                            1}
                        </strong>

                        <p>
                          {item}
                        </p>
                      </div>
                    )
                  )
                )}
              </div>

            </div>

            <div className="tips-card">
              <h2>
                Conselhos de estilo de vida
              </h2>

              {lifestyle.length ===
              0 ? (
                <p>
                  Nenhum conselho de estilo
                  de vida disponível.
                </p>
              ) : (
                lifestyle.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={index}
                      className="tip-item"
                    >
                      {item}
                    </div>
                  )
                )
              )}
            </div>
          </>
        )}

      </main>
    </div>
  );
}
