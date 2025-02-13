export function getPrivateEnvVariables() {
  return {
    secretKey: Deno.env.get('CLERK_SECRET_KEY'),
    jwtKey: Deno.env.get('CLERK_JWT_KEY'),
  };
}
