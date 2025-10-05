const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getReports() {
    const res = await fetch(`${BASE_URL}/reports`, {
        method: "GET"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Retrival of reports failed");

    return data;
}