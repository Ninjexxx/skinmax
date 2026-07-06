import "./CameraCard.css";

export default function CameraCard({ image }) {
  return (
    <div className="camera-card">
      <img
        src={
          image?.preview
            ? image.preview
            : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800"
        }
        alt="Pré-visualização"
        className="camera-image"
      />

      <div className="camera-content">
        <div
          className={`camera-status ${
            image?.preview
              ? "uploaded-status"
              : ""
          }`}
        >
          {image?.preview
            ? "IMAGEM ENVIADA"
            : "IA PRONTA"}
        </div>

        <h3>
          {image?.preview
            ? "Pronta para análise"
            : "Envie uma imagem do rosto"}
        </h3>

        <p>
          {image?.preview
            ? "Sua imagem foi enviada com sucesso. Clique em Analisar minha pele para continuar."
            : "Envie uma imagem frontal e nítida para uma análise de pele mais precisa."}
        </p>
      </div>
    </div>
  );
}
