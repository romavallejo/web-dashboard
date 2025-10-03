import { useState, useEffect, useRef } from "react";
import '../css/ImageUploader.css'

export default function ImageUploader({ setImageLink, errorLog }) {

    const [isUploading,setIsUploading] = useState(false);
    const [errorInUpload,setErrorInUpload] = useState(false);
    const fileInputRef = useRef(null);


    useEffect(()=>{
        if (errorInUpload) {
            fileInputRef.current.value = "";
        }
    },[errorInUpload]);

    const handleFileChange = async e => {
        const file = e.target.files[0];
        if (!file) return;
        
        setIsUploading(true);
        setErrorInUpload(false);

        const formData = new FormData();
        formData.append("file",file);

        try {
            const res = await fetch("http://18.221.59.69/images/report-pictures",{
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) throw new Error("Upload failed");
            // ! aqui ya se guarda el path :) - att: artie
            setImageLink(data.path);
        } catch (err) {
            setErrorInUpload(true);
            console.log("Upload error: ", err);
        }
        finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="image-upload">
            <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}/>

            {isUploading && 
                <p className="uploading">Uploading Image...</p>
            }

            {errorInUpload && 
                <p className="error-message">* Error in image upload</p>
            }
            
        </div>
    );
}