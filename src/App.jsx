import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "./pages/Sidebar"
import { ReportProvider } from "./context/ReportContext"
import './css/dashboard.css'


function App() {

  const location = useLocation()

  return (
    <>
      <div className="dashboard">
        <Sidebar current={location.pathname}/>
        <ReportProvider>
          <Outlet/>
        </ReportProvider>
      </div>
    </>
  )
}

export default App
