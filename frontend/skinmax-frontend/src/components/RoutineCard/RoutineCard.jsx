import "./RoutineCard.css";

export default function RoutineCard({
  advice = {},
}) {
  const morning =
    advice?.routine_am || [];

  const evening =
    advice?.routine_pm || [];

  return (
    <div className="routine-card">

      <h4 className="routine-title">
        RITUAL RECOMENDADO
      </h4>

      <div className="routine-grid">

        <div className="routine-column">
          <h3>Ritual da manhã</h3>

          {morning.length === 0 ? (
            <p>
              Nenhuma rotina matinal disponível.
            </p>
          ) : (
            morning.map(
              (item, index) => (
                <div
                  key={index}
                  className="routine-item"
                >
                  <strong>
                    Passo {index + 1}
                  </strong>

                  <p>{item}</p>
                </div>
              )
            )
          )}
        </div>

        <div className="routine-column">
          <h3>Ritual da noite</h3>

          {evening.length === 0 ? (
            <p>
              Nenhuma rotina noturna disponível.
            </p>
          ) : (
            evening.map(
              (item, index) => (
                <div
                  key={index}
                  className="routine-item"
                >
                  <strong>
                    Passo {index + 1}
                  </strong>

                  <p>{item}</p>
                </div>
              )
            )
          )}
        </div>

      </div>

    </div>
  );
}
