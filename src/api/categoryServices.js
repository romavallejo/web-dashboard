
export async function getCategories() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`, {
        method: "GET"
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Retrival of categories failed");

    return data;
}

export async function createNewCategory(categoryInfo) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: categoryInfo.name,
            description: categoryInfo.description
        })
    })

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error creating category");

    return true;
}

export async function updateExistingCategory(categoryInfo) {

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: categoryInfo.id,
            name: categoryInfo.name,
            description: categoryInfo.description
        })
    })

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error updating category");

    return true; 
}

export async function deleteExistingCategory(categoryInfo) {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`,{
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: categoryInfo.id,
        })
    })

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Error eliminating category");

    return true; 
}