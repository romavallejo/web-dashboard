const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function authenticateCredentials(e, p) {
  console.log(
    JSON.stringify({
      email: e,
      password: p,
      type: "web",
    })
  );

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: e,
      password: p,
      type: "web",
    }),
  });

  if (!res.ok) throw new Error(data?.message || "Login Failed");
  const data = await res.json();

  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}

export async function refreshAccessToken(refToken) {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    refreshToken: refToken,
  });

  if (!res.ok) throw new Error(data?.message || "Refresh Failed");

  if (res.status === 201)
    return {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };
}

export async function verifyToken(accessToken) {
  const response = await fetch(`${BASE_URL}/auth/verify`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Token verification failed");
      return res.json();
    })
    .then((data) => {
      console.log("verifying token", data);
      return data;
    });

  return response.data;
}
