import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'
import Estadisticas from './pages/Estadisticas.jsx'
import Categorias from './pages/Categorias.jsx'
import Reportes from './pages/Reportes.jsx'
import Configuracion from './pages/Configuracion.jsx'
import LogIn from './pages/LogIn.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import TermsCond from './pages/TermsCond.jsx'

const router = createBrowserRouter([
  {path:"/",element:<App/>,children:[
    {index:true, element: <Estadisticas />},
    {path:"categorias", element: <Categorias />},
    {path:"reportes", element: <Reportes />},
    {path:"t&c", element: <TermsCond />},
    {path:"configuracion", element: <Configuracion />},
    //should add terminos y condiciones here
  ]},
  {path:"/login",element:<LogIn/>},
  {path:"*",element:<ErrorPage/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
