import { createContext, useContext, useState, useMemo } from "react";

const ReportContext = createContext();

export function ReportProvider({ children }) {

    const [reportInfo, setReportInfo] = useState({
        id: 0,
        title: "",
        image: null,
        categories: [],
        description: "",
        link: "",
        status_id: 0,
        user: "",
        created_by: ""
    });

    const [errors, setErrors] = useState({});
    function validateInfo() { 
        let newErrors = {};

        if (!reportInfo.title.trim())
            newErrors.title = "El reporte debe tener un título";
        if (reportInfo.categories.length === 0)
            newErrors.categories = "El reporte debe pertenecer por lo menos a una categoría";
        if (!reportInfo.description.trim())
            newErrors.description = "El reporte debe contar con una descripción";
        if (!reportInfo.link.trim())
            newErrors.link = "El reporte debe incluir el link relacionado"
        if (reportInfo.status_id === 0)
            newErrors.status_id = "El reporte debe encontrarse en algún estado"
        if (!reportInfo.image)
            newErrors.image = "El reporte debe contar con una imagen"

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const [filteredReports,setFilteredReports] = useState([]);
    const [filters,setFilters] = useState(
        {
            textFilter: "",
            status_id: 0,
            categoryFilter: 0,
            dateFilter: ""
        }
    );

    const obj = useMemo(()=>({
            reportInfo, setReportInfo,
            errors, setErrors,
            validateInfo,
            filteredReports, setFilteredReports,
            filters, setFilters,
        }));

    return (
        <ReportContext.Provider value={obj}>
        {children}
        </ReportContext.Provider>
    );
}

export const useReport = () => useContext(ReportContext);
