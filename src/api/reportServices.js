const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getReports() {
    const res = await fetch(`${BASE_URL}/reports`, {
        method: "GET"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Retrival of reports failed");

    return data;
}

export async function createNewReport(reportInfo) {

    const res = await fetch(`${BASE_URL}/reports`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: reportInfo.title,
            image: reportInfo.image,
            description: reportInfo.description,
            status_id: reportInfo.status_id,
            category: reportInfo.categories,
            report_url: reportInfo.link
        })
    })

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error creating report");

    return true;
}

export async function updateReport(reportInfo) {

    //console.log("uploaded image with result path: ",reportInfo.image);

    const res = await fetch(`${BASE_URL}/reports/${reportInfo.id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: reportInfo.title,
            image: reportInfo.image,
            description: reportInfo.description,
            created_by: reportInfo.created_by,
            status_id: reportInfo.status_id,
            category: reportInfo.categories,
            report_url: reportInfo.link
        })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error updating report");

    return true;
}

export async function deleteReportService(reportInfo) {

    const res = await fetch(`${BASE_URL}/reports/${reportInfo.id}`,{
        method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error deleting report")

    return true;
}