const BASE_URL = import.meta.env.VITE_BACKEND_URL;

//  /auth/login
//email: 
//password: 
async function authenticateCredentials(e, p) {
    const res = await fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        body: JSON.stringify({
            email: e,
            passworld: p
        })   
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Login Failed");

    return res;
}


//  /sometihg-refresh
//   /auth/refresh
//refreshToken:
async function refreshAccessToken() {

}

