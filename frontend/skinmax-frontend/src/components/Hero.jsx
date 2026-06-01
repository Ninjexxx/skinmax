import heroImage from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Logo */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <h1 className="logo">SKINMAX</h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="hero-title">
          Your glow, curated.
        </h1>

        <p className="hero-subtitle">
          Curated skincare AI recommendations for clean,
          <br />
          clear skin.
        </p>

        <button className="hero-btn">
          ANALYZE TODAY
        </button>
      </div>
    </section>
  );
}