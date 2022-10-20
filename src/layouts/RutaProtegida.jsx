import { Outlet,Navigate } from "react-router-dom"
import { useContext } from "react"
import useAuth from "../hooks/useAuth"


const RutaProtegida = () => {


  const {auth,cargando} = useAuth();
  if(cargando){
    return "cargando..."
  }

  return (
    <>
    {auth._id ? 'autenticado':<Navigate to="/"/>}
    </>
  )
}

export default RutaProtegida