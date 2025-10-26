
export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/images/report-pictures`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    
    if (!res.ok) throw new Error(data?.message || "Image upload failed");
    
    return data;
}

export async function deleteImage(path) {
    const toSend = {path:path};

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/images/`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(toSend)
    })

    if (!res.ok) throw new Error(`Failed to delete image (status ${res.status})`);

    return true;
}