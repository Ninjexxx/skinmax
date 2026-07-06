import "./UploadCard.css";

export default function UploadCard({
  image,
  setImage,
}) {
  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage({
      file,
      preview:
        URL.createObjectURL(file),
    });
  };

  return (
    <div className="upload-card">
      <div className="upload-icon">
        +
      </div>

      <h3>Enviar imagem</h3>

      <p>
        Arraste e solte uma imagem de alta
        resolução do seu perfil facial.
      </p>

      <div className="file-types">
        <span>JPG</span>
        <span>PNG</span>
        <span>HEIC</span>
      </div>

      <label className="upload-btn">
        Escolher imagem

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
      </label>
    </div>
  );
}
