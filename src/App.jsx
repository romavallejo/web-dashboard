import { Outlet, Link } from "react-router-dom"
import Sidebar from "./pages/Sidebar"

function App() {

  return (
    <div>
      <Sidebar/>
      <hr/>
      <Outlet/>
    </div>
  )
}

export default App
