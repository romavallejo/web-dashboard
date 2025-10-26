export async function getUsersCount() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/user/count`,{
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error creating category");

    return data;
}