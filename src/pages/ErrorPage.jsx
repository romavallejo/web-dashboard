import { Link } from "react-router-dom";
import '../css/errorPage.css'

export default function ErrorPage() {

    return (
        <div className="error-page">
            <h1>Page Not Found</h1>
            <Link to="/">Go back</Link>
        </div>
    );

};