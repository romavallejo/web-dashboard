import { useState } from 'react';
import '../css/pageBase.css'
import Card from '../components/Card.jsx'
import '../css/TermsCond.css'

export default function TermsCond() {
    
    const [isFieldEmpty,setIsFieldEmpty] = useState(false);

    const [terms,setTerms] = useState("Lorem ipsum dolor sit, amet consectetur adipisicing elit...");
    const [isEditing,setIsEditing] = useState(false);
    const [draftTerms,setDraftTerms] = useState(terms);

    function editing(){
        setDraftTerms(terms);
        setIsEditing(true);
    }

    function cancel(){
        setDraftTerms(terms);
        setIsEditing(false);
        setIsFieldEmpty(false);
    }

    function save(){
        if (draftTerms.trim()) {
            //fetch call here
            setTerms(draftTerms);
            setIsEditing(false);
        } else {
            setIsFieldEmpty(true);
        }  
    }
    
    return (
        <div className="page">
            <div className='header'>
                <h1>Términos y Condiciones</h1>
                {!isEditing ? (<button onClick={editing}>Actualizar T&C</button>) : 
                (<div>
                    <button className='green' onClick={save}>Guardar</button>
                    <button className='red' onClick={cancel}>X</button>
                </div>)}
            </div>
            <div className="grid">
                <Card title='Actuales' size={[1,4]}>
                    {!isEditing ? (<p>{terms}</p>) : 
                    (<textarea 
                        className='edit-text' 
                        value={draftTerms} 
                        onChange={e => setDraftTerms(e.target.value)}
                        rows={15}
                        maxLength="16777215"
                    />)}

                    {isFieldEmpty && <p className='error-message'>* Los términos y condiciones no pueden estar vacios</p>}

                </Card>
            </div>
        </div>
    );
};