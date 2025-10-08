const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUsersCount() {
    const res = await fetch(`${BASE_URL}/admin/user/list`,{
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error creating category");

    return data;
}