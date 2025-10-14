const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getTermsCond() {
    const res = await fetch(`${BASE_URL}/configurations/1`, {
        method: "GET"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Retrival of Terms failed");

    return data;
}

export async function updateTermsCond(newTerms) {

    const res = await fetch(`${BASE_URL}/configurations/1`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "title":"Terminos y condiciones",
            "text":newTerms
        })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error updating Terms");

    return true;
}
