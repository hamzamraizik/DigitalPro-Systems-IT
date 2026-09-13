const markers = [
  { className: "hero-marker hero-marker--one", label: "01" },
  { className: "hero-marker hero-marker--two", label: "02" },
  { className: "hero-marker hero-marker--three", label: "03" },
];

export const HeroAtmosphere = () => (
  <div className="hero-atmosphere" aria-hidden="true">
    <div className="hero-atmosphere__wash" />
    <div className="hero-orbit hero-orbit--outer" />
    <div className="hero-orbit hero-orbit--inner" />
    <div className="hero-scanline" />
    <div className="hero-signal hero-signal--left" />
    <div className="hero-signal hero-signal--right" />
    {markers.map((marker) => (
      <span className={marker.className} key={marker.label}>
        <span className="hero-marker__dot" />
        <span className="hero-marker__label">{marker.label}</span>
      </span>
    ))}
  </div>
);
