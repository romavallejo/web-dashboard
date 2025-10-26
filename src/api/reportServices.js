

export async function getReports() {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`, {
    method: "GET",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Retrival of reports failed");

  return data;
}

export async function createNewReport(reportInfo) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports`, {
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

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${reportInfo.id}`, {
    method: "PUT",
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

  if (!res.ok) throw new Error("Error updating report");
  console.log("User id:", JSON.stringify(reportInfo.created_by));

  if (reportInfo.status_id != 1) {
    await sendNotification(
      reportInfo.created_by,
      reportInfo.status_id,
      reportInfo.title
    );
  }

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

  console.log("Notificación que se enviará:", {
    created_by: userId,
    title: title,
    message: message,
  });

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notifications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      created_by: userId,
      title: title,
      message: message,
    }),
  });

  if (!res.ok) throw new Error("Error sending notification");

  return true;
}

export async function deleteReportService(reportInfo) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reports/${reportInfo.id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Error deleting report");

  return true;
}

