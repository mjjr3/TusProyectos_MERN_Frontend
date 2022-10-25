import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "./Alerta"


const FormularioProyecto = () => {

    const [nombre,setNombre] = useState('')
    const [descripcion,setDescripcion] = useState('')
    const [fechaEntrega,setFechaEntrega] = useState('')
    const [cliente,setCliente] = useState('')
    const [id,setId] = useState(null)
    const params = useParams();

    const {mostrarAlerta,alerta,setAlerta,submitProyecto,proyecto} = useProyectos();




    useEffect(() => {   
       if(params.id){
        setId(proyecto._id)
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
        setCliente(proyecto.cliente)
       }
     
  }, [])

    const handleSubmit = async e=>{
        e.preventDefault();
        if([nombre,descripcion,fechaEntrega,cliente].includes('')){
          
            mostrarAlerta({
                msg:"Todos los campos son obligatorios",
                error:true
            })
            return
        }

        await submitProyecto({id,nombre,descripcion,fechaEntrega,cliente})

        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setCliente('')
     
    }

    const {msg} = alerta;

  return (
    <>

        <form 
        onSubmit={handleSubmit}
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">

            <div className="mb-5">

         {msg && <Alerta alerta={alerta}/>}

            <label  className="text-gray-700 uppercase font-bold text-sm"
        htmlFor="nombre">Nombre Proyecto</label>
           
            <input 
            id="nombre"
            type="text"
            onChange={e => setNombre(e.target.value)}
            name="nombre"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del proyecto"
            value={nombre}
            
            />
             </div>
             <div className="mb-5">
            <label  className="text-gray-700 uppercase font-bold text-sm"
        htmlFor="descripcion">Descripción Proyecto</label>
           
            <textarea 
            id="descripcion"         
            onChange={e => setDescripcion(e.target.value)}
            name="descripcion"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Descripcion del proyecto"
            value={descripcion}
            
            />
             </div>
             <div className="mb-5">
            <label  className="text-gray-700 uppercase font-bold text-sm"
        htmlFor="fecha">Fecha Entrega Proyecto</label>
           
            <input 
            id="fecha"
            type="date"
            onChange={e => setFechaEntrega(e.target.value)}
            name="fecha"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Fecha de entrega"
            value={fechaEntrega}
            
            />
             </div>
             <div className="mb-5">
            <label  className="text-gray-700 uppercase font-bold text-sm"
        htmlFor="cliente">Cliente Asociado</label>
           
            <input 
            id="cliente"
            type="text"
            onChange={e => setCliente(e.target.value)}
            name="cliente"
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Cliente asociado"
            value={cliente}
            
            />
             </div>
             <input type="submit"
             value={id ? 'Actualizar Proyecto':'Crear Proyecto'}
             className="bg-sky-600 w-full p-3 uppercase font-bold text-white
             rounded cursor-pointer hover:bg-sky-700 transition-colors"
             />
        </form>
        </>
  )
}

export default FormularioProyecto