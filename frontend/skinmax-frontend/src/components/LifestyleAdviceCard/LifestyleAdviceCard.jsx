import "./LifestyleAdviceCard.css";

export default function LifestyleAdviceCard({
  advice = [],
}) {
  const icons = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ];

  return (
    <div className="lifestyle-card">
      <h3>
        Conselhos de estilo de vida
      </h3>

      <div className="advice-grid">
        {advice.map((item, index) => (
          <div
            key={index}
            className="advice-item"
          >
            <span className="advice-icon">
              {
                icons[
                  index %
                    icons.length
                ]
              }
            </span>

            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
