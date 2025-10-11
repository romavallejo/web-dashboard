const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function authenticateCredentials(e, p) {
    console.log(JSON.stringify({
            email: e,
            password: p,
            type: "web"
        }))

    const res = await fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        //headers:  {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: e,
            password: p,
            type: "web"
        })   
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Login Failed");

    return {accessToken: response.data.accessToken,refreshToken: response.data.refreshToken};
}

export async function refreshAccessToken(refToken) {
    const res = await fetch(`${BASE_URL}/auth/refresh`,{
        refreshToken: refToken
    });

    if (!res.ok) throw new Error(data?.message || "Refresh Failed");

    if (res.status === 201)
        return {accessToken: res.data.accessToken,refreshToken: res.data.refreshToken}
}