import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [alerta,setAlerta] = useState({})
  const {auth,setAuth,cargando} = useAuth()


  const handleSubmit = async e => {
    e.preventDefault();
    if([email,password].includes('')){
      setAlerta({
        msg:"Todos los campos son obligatorios",
        error:true
      })
      return
    }
    try {

      const {data} = await clienteAxios.post('/usuarios/login',{email,password})
      localStorage.setItem('token',data.token)     
      setAlerta({})
      setAuth(data)
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
     
    }
  }
  const {msg} = alerta
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Inicia sesión y administra <br /><span className="text-slate-700">tus proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta}/>}
      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">
            Email
          </label>



          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
          </input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa Contraseña"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
          </input>
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
        hover:cursor-pointer hover:bg-sky-800 transition-colors" />

      </form>
      <nav className="lg:flex lg:justify-between">

        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" 
        to="registrar">
          ¿No tienes una cuenta? Regístrate
          </Link>
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" 
        to="olvide-password">
          Olvidé mi contraseña
          </Link>
      </nav>
    </>
  )
}

export default Login