
export default function Button({ icon, text, onClick, type}) {
    return(
        <button onClick={onClick} className={`button-wrapper ${type == "save" ? "save-type" : type == "delete" ? "delete-type" : "normal-type"}`}>
            {icon && <img src={icon} />}
            {text && <p className="button-text">{text}</p>}
        </button>
    );
}