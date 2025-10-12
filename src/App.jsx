import { Outlet, useLocation, useNavigate, } from "react-router-dom"
import Sidebar from "./pages/Sidebar"
import Topbar from "./pages/Topbar"
import { ReportProvider } from "./context/ReportContext"
import { CategoryProvider } from "./context/CategoryContext"
import { useState } from "react"
import './css/dashboard.css'
import { useAuthentication } from './context/AuthenticationContext'
import { useEffect } from "react"

function App() {

  const {isAuthenticated, loadingTokens} = useAuthentication();
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (!loadingTokens && !isAuthenticated)
      navigate('/login');
  },[isAuthenticated, loadingTokens]);

  const location = useLocation()
  const [isSidebarContracted,setIsSidebarContracted] = useState(false)

  return (
    <>
      {isAuthenticated &&
        <div className="dashboard">
        <Sidebar className={!isSidebarContracted ? "not-contracted" : "contracted"} isContracted={isSidebarContracted} setIsContracted={setIsSidebarContracted} current={location.pathname}/>
        <Topbar current={location.pathname}/>
        <div className="main-content">
        <ReportProvider>
          <CategoryProvider>
            <Outlet/>
          </CategoryProvider>
        </ReportProvider>
        </div>
      </div>
      }
    </>
  )
}

export default App
