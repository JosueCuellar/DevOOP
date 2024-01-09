import { Button, Row, Col, Card, CardHeader, CardBody, CardFooter, Alert } from 'reactstrap';
import TablaEmpleado from '../TablaEmpleado';
import { useEffect, useState } from 'react';
import ModalEmpleado from '../ModalEmpleado';
import Search from '../Search';
import Pagination from '../Pagination';

function Empleado() {
    //Estado que almacena todos los empleados del get
    const [empleados, setEmpleados] = useState([]);
    //Estado que controla el modal 
    const [mostrarModal, setMostrarModal] = useState(false);
    //Estado para guardar el empleado a editar
    const [editar, setEditar] = useState(null);

    //Alert
    const [alerta, setAlerta] = useState(false);
    const [msg, setMsg] = useState("");
    const [tipo, setTipo] = useState("");



    useEffect(() => {
        const timer = setTimeout(() => {
            setAlerta(false);
        }, 2000); // Cambia el estado a false después de 10 segundos

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [alerta]);
    //--------------

    //Metodo que se encarga de llamar a la API, para poder listar todos los empleados
    //Cambia el estado de empleados

    //----------------------------------------- Listar ------------------------------------------------
    const [pageNumber, updatePageNumber] = useState(1);
    const [info, setInfo] = useState([]);

    const [nombreBusqueda, setNombreBusqueda] = useState("");
    const [documentoBusquea, serDocumentoBusqueda] = useState("");
    let api = `/api/empleado/ListaAll/${pageNumber}`;
    if (nombreBusqueda !== "") {
        api = `/api/empleado/ListaNombre/${pageNumber}/${nombreBusqueda}`;
    }
    if (documentoBusquea !== "") {
        api = `/api/empleado/ListaDocumento/${pageNumber}/${documentoBusquea}`;
    }
    if (nombreBusqueda !== "" && documentoBusquea !== "") {
        api = `/api/empleado/ListaNombreAndDocumento/${pageNumber}/${nombreBusqueda}/${documentoBusquea}`;
    }


    const mostrarEmpleados = async () => {
        console.log(api);
        const response = await fetch(api);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setEmpleados(data.results);
            setInfo(data.info);
        } else {
            console.log("ERROR");
        }
    };

    useEffect(() => {
        mostrarEmpleados();
    }, [api])


    //----------------------------------------- Guardar ------------------------------------------------

    const guardarEmpleado = async (empleado) => {
        //Contacto id es Guid, se eliminar para que se genere automaticamente
        delete empleado.idEmpleado;
        const response = await fetch("/api/empleado/Guardar", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(empleado)
        })
        if (response.ok) {
            //Si el empleado es guardado correctamente, entonces, se oculta el modal
            //y se actualiza el listado de empleados
            setMostrarModal(!mostrarModal);
            setAlerta(true);
            setTipo("success");
            setMsg("Se ha guardado correctamente el empleado")
            mostrarEmpleados();
        }
    }
    //-------------------------------------------------------------------------------------------------


    //----------------------------------------- Editar ------------------------------------------------

    //Metodo que ejecuta la API para guardar un empleado, esta misma es usada por Modal Contacto como props 
    const editarEmpleado = async (contacto) => {
        delete contacto.subArea;
        delete contacto.tipoDocumento;
        const response = await fetch("/api/empleado/Editar", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(contacto)
        })
        if (response.ok) {
            console.log(response);
            //Si el empleado es guardado correctamente, entonces, se oculta el modal
            //y se actualiza el listado de empleados
            setMostrarModal(!mostrarModal);
            setAlerta(true);
            setTipo("warning");
            setMsg("Se ha editado correctamente el empleado")
            mostrarEmpleados();
        }
    }

    //-------------------------------------------------------------------------------------------------

    //----------------------------------------- Eliminar ------------------------------------------------

    const eliminarEmpleado = async (id) => {

        const response = await fetch("/api/empleado/Eliminar/" + id, {
            method: 'DELETE',
        })

        var respuesta = window.confirm("Desea eliminar el empleado")
        if (!respuesta) {
            return;
        }

        if (response.ok) {
            updatePageNumber(1);
            setAlerta(true);
            setMsg("Se ha eliminado correctamente el empleado")
            setTipo("danger")
            mostrarEmpleados();
        }
    }

    //-----------------------------------------------------------------------------------------------------

    return (
        <div className="p-3">
            <Row>
                {alerta ? <Alert color={tipo}>
                    {msg}
                </Alert> : <></>}            
                <Col md={12}>
                    <hr></hr>
                    <div>
                        <h5 className="text-bold">Buscador</h5>
                        <Search setNombreBusqueda={setNombreBusqueda} setDocumentoBusqueda={serDocumentoBusqueda} updatePageNumber={updatePageNumber} />
                    </div>
                    <hr></hr>

                    <Card>
                        <CardHeader>
                            <h5>Lista de Empleados</h5>
                        </CardHeader>

                        <CardBody>
                            <Row>
                                <Col md={2}>
                                    <Button block color="success"
                                        size="" onClick={() => { setMostrarModal(!mostrarModal) }}>
                                        Nuevo Empleado
                                    </Button>
                                </Col>
                                <Col md={10}>                                   
                                </Col>
                            </Row>
                          
                            <hr></hr>
                            {/*Recibe como props la lista de empleados para crear la tabla*/}
                            {/*Settea la informacion del empleado a editar*/}
                            <TablaEmpleado
                                data={empleados}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}

                                eliminarEmpleado={eliminarEmpleado}
                            />
                        </CardBody>
                        <CardFooter>
                            <Pagination
                                info={info}
                                pageNumber={pageNumber}
                                updatePageNumber={updatePageNumber}
                            />
                        </CardFooter>
                    </Card>

                </Col>
               
            </Row>
            <ModalEmpleado
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarEmpleado={guardarEmpleado}

                //Contiene el objeto de contato de editar que ha sido enviado desde la tabla
                editar={editar}
                setEditar={setEditar}

                //Se utiliza para editar el empleado con los datos nuevos que seran escritos en el modal
                editarEmpleado={editarEmpleado}

            />
        </div>


    );
}

export default Empleado;