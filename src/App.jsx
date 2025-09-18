import { Outlet, Link } from "react-router-dom"
import Sidebar from "./pages/Sidebar"
import './css/dashboard.css'

function App() {

  return (
    <>
      <div className="dashboard">
        <Sidebar/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
