const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories`, {
        method: "GET"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Retrival of categories failed");

    return data;
}