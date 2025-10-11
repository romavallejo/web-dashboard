const BASE_URL = import.meta.env.VITE_BACKEND_URL;

//  /auth/login
//email: 
//password: 
async function authenticateCredentials(e, p) {
    const res = await fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        body: JSON.stringify({
            email: e,
            passworld: p,
            type: "web"
        })   
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Login Failed");

    return {accessToken: response.data.accessToken,refreshToken: response.data.refreshToken};
}


//  /sometihg-refresh
//   /auth/refresh
//refreshToken:
async function refreshAccessToken(refToken) {
    const res = await fetch(`${BASE_URL}/auth/refresh`,{
        refreshToken: refToken
    });

    if (!res.ok) throw new Error(data?.message || "Refresh Failed");

    if (res.status === 201)
        return {accessToken: res.data.accessToken,refreshToken: res.data.refreshToken}
}