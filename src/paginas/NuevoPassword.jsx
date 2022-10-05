
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from "../components/Alerta"
const NuevoPassword = () => {


  const params = useParams();
  const { token } = params
  const [alerta, setAlerta] = useState({})
  const [newPassword, setNewPassword] = useState('')
  const [tokenValido, settokenValido] = useState(false)
  const [passwordModificado, setPasswordModificado] = useState(false)

  useEffect(() => {

    const validarToken = async () => {
      try {
        const url = `http://localhost:4000/api/usuarios/olvide-password/${token}`
        await axios(url)
        settokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })

      }
    }
    validarToken();
  }, []);




  const handleSubmit = async e => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener mínimo 6 caracteres",
        error: true
      })
      return
    }

    try {
      const url = `http://localhost:4000/api/usuarios/olvide-password/${token}`
      const { data } = await axios.post(url,{"password":newPassword})
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordModificado(true)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a <br /><span className="text-slate-700">tus proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      {tokenValido && (
        <form className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu nueva contraseña"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50">
            </input>
          </div>

          <input
            type="submit"
            value="Guardar nuevo password"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded
        hover:cursor-pointer hover:bg-sky-800 transition-colors" />

        </form>
      )}
      {passwordModificado && (
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/">
          Ir a Iniciar Sesión
        </Link>
      )}
    </>
  )
}

export default NuevoPassword