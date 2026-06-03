import "./SkinProfileCard.css";

export default function SkinProfileCard() {
  return (
    <div className="skin-profile-card">
      <h4 className="section-title">
        SKIN PROFILE
      </h4>

      <div className="profile-grid">

        <div className="profile-item">
          <span>Skin Type</span>
          <strong>Oily</strong>
        </div>

        <div className="profile-item">
          <span>Acne Severity</span>
          <strong>Moderate</strong>
        </div>

        <div className="profile-item">
          <span>Hydration</span>
          <strong>Low</strong>
        </div>

        <div className="profile-item">
          <span>Sensitivity</span>
          <strong>Medium</strong>
        </div>

      </div>
    </div>
  );
}