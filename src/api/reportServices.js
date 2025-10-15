const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function getReports() {
  const res = await fetch(`${BASE_URL}/reports`, {
    method: "GET",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Retrival of reports failed");

  return data;
}

export async function createNewReport(reportInfo) {
  const res = await fetch(`${BASE_URL}/reports`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: reportInfo.title,
      image: reportInfo.image,
      description: reportInfo.description,
      status_id: reportInfo.status_id,
      category: reportInfo.categories,
      report_url: reportInfo.link,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error creating report");

  return true;
}

export async function updateReport(reportInfo) {
  //console.log("uploaded image with result path: ",reportInfo.image);

  const res = await fetch(`${BASE_URL}/reports/${reportInfo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: reportInfo.title,
      image: reportInfo.image,
      description: reportInfo.description,
      created_by: reportInfo.created_by,
      status_id: reportInfo.status_id,
      category: reportInfo.categories,
      report_url: reportInfo.link,
    }),
  });

  if (!res.ok) throw new Error(data?.message || "Error updating report");
  if (reportInfo.status_id != 1) {
    await sendNotification(
      Number(reportInfo.created_by),
      reportInfo.status_id,
      reportInfo.title
    );
  }
  const data = await res.json();

  return true;
}

export async function deleteReportService(reportInfo) {
  const res = await fetch(`${BASE_URL}/reports/${reportInfo.id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error deleting report");

  return true;
}

export async function sendNotification(userId, statusId, titleReport) {
  const reportStatuses = {
    1: "Pendiente",
    2: "Aprobado",
    3: "Rechazado",
  };

  const title = `El estado de su reporte ha cambiado a: ${reportStatuses[statusId]}`;
  const message = `El estado de su reporte titulado ${titleReport} ha sido actualizado a ${reportStatuses[statusId]}`;

  const res = await fetch(`${BASE_URL}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ created_by: 1, title: title, message: message }),
  });

  if (!res.ok) throw new Error("Error sending notification");
  const data = await res.json();

  return true;
}
