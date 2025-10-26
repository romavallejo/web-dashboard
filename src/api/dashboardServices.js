const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getDashboardInformation() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard`,{
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error creating category");

    return data;
}