export async function login({ email, password }: LoginParams) {
  const response = await fetch(
    "https://backend-login-placeholder.deno.dev/api/users/login",
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (data.status === "error") {
    throw new Error(data.code);
  }
  return data.payload.jwt;
}

export async function userTokenPersister(jwt: string) {
  try {
    localStorage.setItem("token", jwt);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
