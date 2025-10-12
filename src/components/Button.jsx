import '../css/Button.css'

export default function Button({ icon, text, onClick, style, disable, type }) {

    return(
        <button type={type} disabled={disable} onClick={onClick} className={`button-wrapper ${style === "save" ? "save-type" : style === "delete" ? "delete-type" : "normal-type"}`}>
            {icon && <img src={icon} />}
            {text && <p className="button-text">{text}</p>}
        </button>
    );
}