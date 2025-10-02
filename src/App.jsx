import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./pages/Sidebar"
import './css/dashboard.css'


function App() {

  const location = useLocation()

  return (
    <>
      <div className="dashboard">
        <Sidebar current={location.pathname}/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
