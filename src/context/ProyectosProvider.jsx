import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";


const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    return
                }
        
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/proyectos',config)
                setProyectos(data)
    

            } catch (error) {

            }
        }
        obtenerProyectos();
    }, [])


    const mostrarAlerta = alerta => {
        setAlerta(alerta);
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }
    const submitProyecto = async proyecto => {

        if(proyecto.id){
            await editarProyecto(proyecto)
        }else
        {
            await nuevoProyecto(proyecto)
        }

      
    }
    const nuevoProyecto = async proyecto =>{
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            setProyectos([...proyectos,data])

            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);

        } catch (error) {
            console.log(error.respose.data.msg)
        }
    }
    const editarProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }
    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} =  await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config)
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id
                ? data:proyectoState)

            setProyectos(proyectosActualizados)

            setAlerta({
                msg: 'Proyecto Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate("/proyectos")
            }, 3000);
            
            
        } catch (error) {
            
        }
    }
    const obtenerProyecto = async id=>{
        setCargando(true)
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/proyectos/${id}`, config)
            console.log(data)
            setProyecto(data)
        } catch (error) {
            console.log(error.respose.data.msg)
        }
        finally{
            setCargando(false)
        }
    }
    const eliminarProyecto = async id =>{ 
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }    
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }    
            try {
                const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)
               
                const proyectosActualizados = proyectos.filter(proyectoState => 
                proyectoState._id !== id)
                setProyectos(proyectosActualizados);

                setAlerta({
                    msg: 'Proyecto Eliminado Correctamente',
                    error: false
                })
    
                setTimeout(() => {
                    setAlerta({})
                    navigate("/proyectos")
                }, 3000);
    
            } catch (error) {
                console.log(error.respose.data.msg)
            }
     
    }
    

    return (

        <ProyectosContext.Provider
            value={{
                obtenerProyecto,
                alerta,
                setAlerta,
                mostrarAlerta,
                proyectos,
                submitProyecto,
                proyecto,
                cargando,
                eliminarProyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}
export {
    ProyectosProvider
}

export default ProyectosContext