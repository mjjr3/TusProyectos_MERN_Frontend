
import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
const Registrar = () => {


  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [alerta, setAlerta] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();
    if ([nombre, email, password, rePassword].includes('')) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    if (password !== rePassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true
      })
      return

    }
    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, agrega mínimo 6 caracteres",
        error: true
      })
      return

    }
    setAlerta({})

    //CREANDO USUARIO EN LA API
    try {
      const nuevoUsuario = {nombre,email,password}
      const {data} = await clienteAxios.post(`/usuarios`,nuevoUsuario)
      setAlerta({
        msg:data.msg,
        error:false
      })
      setNombre('')
      setEmail('')
      setPassword('')
      setRePassword('')
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }


  }
  const { msg } = alerta
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu cuenta y administra<br /><span className="text-slate-700">tus proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">
            Nombre
          </label>
          <input
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            id="nombre"
            type="nombre"
            placeholder="Tu nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
          </input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">
            Email
          </label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
          </input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">
            Contraseña
          </label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Ingresa Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
          </input>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="re_password">
            Repite Contraseña
          </label>
          <input
            value={rePassword}
            onChange={e => setRePassword(e.target.value)}
            id="re_password"
            type="password"
            placeholder="Repite tu Contraseña"
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
          to="/">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password">
          Olvidé mi contraseña
        </Link>
      </nav>
    </>
  )
}

export default Registrar