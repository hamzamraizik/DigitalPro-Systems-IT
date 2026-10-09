export const SiteBackground = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-page-dark" />
    <div className="absolute inset-0 bg-grid-fade" />
  </div>
);

export default SiteBackground;