import { expressjwt } from "express-jwt";
import jwks from "jwks-rsa";

export const CheckJwt = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-mp9ae75t.us.auth0.com/.well-known/jwks.json",
  }) as jwks.GetVerificationKey,
  audience: "https://natublock.api/",
  issuer: "https://dev-mp9ae75t.us.auth0.com/",
  algorithms: ["RS256"],
});
