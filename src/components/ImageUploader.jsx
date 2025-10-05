import { useState, useEffect, useRef } from "react";
import { uploadImage } from "../api/imageServices";
import '../css/ImageUploader.css'

export default function ImageUploader({ setImageLink }) {

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

        try {
            const data = await uploadImage(file);
            setImageLink(data.path);
            console.log("Uploaded image with path: ", data.path);
        } catch(err) {
            console.error("Upload error:", err);
        setErrorInUpload(true);
        } finally {
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