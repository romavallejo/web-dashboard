import { createContext, useContext, useMemo, useState } from "react";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {

    const [categoryInfo,setCategoryInfo] = useState({
        id: 0,
        name: "",
        description: ""
    });

    const [errors,setErrors] = useState({});
    const [allCategories, setAllCategories] = useState([]);
    function validateInfo() {
        let newErrors = {};
        if (!categoryInfo.name.trim())
            newErrors.name = "El nombre de la categoría no puede estar vacío";
        else if (allCategories.some(el => el.name.trim().toLowerCase() === categoryInfo.name.trim().toLowerCase() && el.id !== categoryInfo.id))
            newErrors.name = "El nombre de la categoría ya existe";
        if (!categoryInfo.description.trim())
            newErrors.description = "La descripción de la categoría no puede estar vacía";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const [filteredCategories,setFilteredCategories] = useState([]);

    const obj = useMemo(()=>({
            categoryInfo, setCategoryInfo,
            errors, setErrors,
            validateInfo,
            filteredCategories, setFilteredCategories,
            allCategories, setAllCategories
        }));

    return (
        <CategoryContext.Provider value={obj}>
        {children}
        </CategoryContext.Provider>
    );
}

export const useCategory = () => useContext(CategoryContext);