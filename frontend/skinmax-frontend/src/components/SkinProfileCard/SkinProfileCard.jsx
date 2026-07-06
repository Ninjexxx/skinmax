import "./SkinProfileCard.css";

export default function SkinProfileCard({
  results = {},
}) {
  return (
    <div className="skin-profile-card">

      <h4 className="section-title">
        PERFIL DA PELE
      </h4>

      <div className="profile-grid">

        <div className="profile-item">
          <span>Tom de pele</span>
          <strong>
            {results.skin_tone || "N/D"}
          </strong>
        </div>

        <div className="profile-item">
          <span>Subtom</span>
          <strong>
            {results.undertone || "N/D"}
          </strong>
        </div>

        <div className="profile-item">
          <span>Formato do rosto</span>
          <strong>
            {results.face_shape || "N/D"}
          </strong>
        </div>

        <div className="profile-item">
          <span>Cor dos olhos</span>
          <strong>
            {results.eye_color || "N/D"}
          </strong>
        </div>

        <div className="profile-item">
          <span>Tipo de cabelo</span>
          <strong>
            {results.hair_type || "N/D"}
          </strong>
        </div>

        <div className="profile-item">
          <span>Olheiras</span>
          <strong>
            {results.dark_circles || "N/D"}
          </strong>
        </div>

      </div>
    </div>
  );
}
