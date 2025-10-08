import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./pages/Sidebar"
import Topbar from "./pages/TopBar"
import { ReportProvider } from "./context/ReportContext"
import { CategoryProvider } from "./context/CategoryContext"
import './css/dashboard.css'


function App() {

  const location = useLocation()

  return (
    <>
      <div className="dashboard">
        <Sidebar current={location.pathname}/>
        <Topbar current={location.pathname}/>
        <ReportProvider>
          <CategoryProvider>
            <Outlet/>
          </CategoryProvider>
        </ReportProvider>
      </div>
    </>
  )
}

export default App
