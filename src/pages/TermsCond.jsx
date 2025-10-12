import { useState, useEffect } from 'react';
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx';
import { getTermsCond, updateTermsCond } from '../api/termsCondServices.js';
import '../css/pageBase.css'
import '../css/TermsCond.css'

export default function TermsCond() {

    const [terms,setTerms] = useState("");
    async function fetchTerms(){
        try {
            const data = await getTermsCond();
            setTerms(data);
        } catch(err) { 
            console.log(err)
        }
    }
    useEffect(()=>{
        //fetchTerms();
    },[]);

    const [isFieldEmpty,setIsFieldEmpty] = useState(false);
    const [errorInUplaod,setErrorInUpload] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    const [draftTerms,setDraftTerms] = useState(terms);
    const [isLoading,setIsLoading] = useState(false);

    function editing(){
        setDraftTerms(terms);
        setIsEditing(true);
    }

    function cancel(){
        setDraftTerms(terms);
        setIsEditing(false);
        setIsFieldEmpty(false);
        setErrorInUpload(false);
    }

    async function save() {
        setErrorInUpload(false);
        setIsFieldEmpty(false);
        if (!draftTerms.trim()) {
            setIsFieldEmpty(true);
            return;
        }
        setIsLoading(true);
        try {
            await updateTermsCond(draftTerms);
            await fetchTerms();
            setIsEditing(false);
        } catch(err) {
            console.log(err);
            setErrorInUpload(true);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="page">
            <div className='header'>
                <h1>Términos y Condiciones</h1>
                {!isEditing ? (
                    <Button onClick={editing} text='Actualizar T&C' icon='/icons/terms.svg'/>
                ) : 
                (<div className='terms-options'>
                    <button 
                        className='green' 
                        onClick={save}
                        disabled={false}
                    >
                        <img src='/icons/save.svg' />
                    </button>
                    <button 
                        className='red' 
                        onClick={cancel}
                        disabled={false}
                    >
                        <img src="/icons/x.svg" alt="close"/>
                    </button>
                </div>)}
            </div>
            <div className="grid">
                <Card title='Actuales' size={[1,4]} icon='/icons/terms-sec.svg'>
                    {!isEditing ? (<p>{terms}</p>) : 
                    (<textarea 
                        className='edit-text' 
                        value={draftTerms} 
                        onChange={e => setDraftTerms(e.target.value)}
                        rows={15}
                        maxLength="16777215"
                    />)}

                    {isFieldEmpty && <p className='error-message'>* Los términos y condiciones no pueden estar vacios</p>}
                    {errorInUplaod && <p className='error-message'>* Error al momento de actualizar</p>}
                    {isLoading && <p>Actualizando...</p>}

                </Card>
            </div>
        </div>
    );
};