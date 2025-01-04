import { auth } from "../../../auth";

export async function createLogoutParams() {
  const session = await auth.auth();

  const params = new URLSearchParams({
    post_logout_redirect_uri:
      process.env.JASMINE__URLS__PUBLIC || "http://localhost:10620",
  });

  if (session) {
    params.append("id_token_hint", session.custom.tokens.id.token);
  }

  return params;
}
