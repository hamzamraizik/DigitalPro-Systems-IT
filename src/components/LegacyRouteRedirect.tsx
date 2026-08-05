import { generatePath, Navigate, useParams } from "react-router-dom";

type LegacyRouteRedirectProps = {
  to: string;
};

/** Keeps old/English public links working while the canonical site URLs remain French. */
const LegacyRouteRedirect = ({ to }: LegacyRouteRedirectProps) => {
  const params = useParams();
  return <Navigate to={generatePath(to, params)} replace />;
};

export default LegacyRouteRedirect;
