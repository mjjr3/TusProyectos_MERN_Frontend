
import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import axios from "axios"
const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e=>{
    e.preventDefault();

    if(email === ''){
      setAlerta({
        msg:"El campo email es obligatorio",
        error:true
      })
      return
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`
      console.log(url)
      const {data} = await axios.post(url,{email})
  
      setAlerta({
        msg:data.msg,
        error:false
      })
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
        Recupera tu acceso y no pierdas <br /><span className="text-slate-700">tus proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}>

        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">
            Email
          </label>



          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
          </input>
        </div>

        <input
          type="submit"
          value="Recuperar Contraseña"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
        hover:cursor-pointer hover:bg-sky-800 transition-colors" />

      </form>
      <nav className="lg:flex lg:justify-between">

        <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar">
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword