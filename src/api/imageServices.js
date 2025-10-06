const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${BASE_URL}/images/report-pictures`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    
    if (!res.ok) throw new Error(data?.message || "Image upload failed");
    
    return data;
}

export async function deleteImage(path) {
    const toSend = {path:path};

    console.log(BASE_URL);
    console.log(path);
    console.log(JSON.stringify(toSend));
    const res = await fetch(`${BASE_URL}/images/`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(toSend)
    })

    if (!res.ok) throw new Error(`Failed to delete image (status ${res.status})`);

    return true;
}