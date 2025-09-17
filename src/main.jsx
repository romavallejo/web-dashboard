import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Estadisticas from './pages/Estadisticas.jsx'
import Categorias from './pages/Categorias.jsx'
import Reportes from './pages/Reportes.jsx'
import Configuracion from './pages/Configuracion.jsx'
import LogIn from './pages/LogIn.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

const router = createBrowserRouter([
  {path:"/",element:<App/>,children:[
    {index:true, element: <Estadisticas />},
    {path:"categorias", element: <Categorias />},
    {path:"reportes", element: <Reportes />},
    {path:"configuracion", element: <Configuracion />},
    {path:"configuracion", element: <LogIn />}
    {path:"*", element: <ErrorPage />}
  ]},
  {path:"/login",element:<LogIn/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
