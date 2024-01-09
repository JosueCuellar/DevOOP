import { useEffect } from "react";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"
import SelectsVinculados from "./SelectsVinculados";
import Select from "./Select";


//Se crea el modelo vacio para almacenar el empleado
const modeloEmpleado = {
    idEmpleado: null,
    subAreaId: "",
    nombre: "",
    apellido: "",
    fechaContratacion: "",
    tipoDocumentoId: "",
    numeroDocumento: "",
}

//Los props deben de ser mandados a traves de propiedades de donde se instancia el componente, en este caso App.jsx
const ModalEmpleado = ({ mostrarModal, setMostrarModal, guardarEmpleado, editar, setEditar, editarEmpleado }) => {

    //Se crea el estado del empleado para almacenar el modelo
    const [empleado, setEmpleado] = useState(modeloEmpleado);

    const [errores, setErrores] = useState({});

    const [mascara, setMascara] = useState("");

    const [paisSeleccionado, setPaisSeleccionado] = useState({});
    const [areaSeleccionada, setAreaSeleccionada] = useState({});
    const [subAreaSeleccionada, setSubAreaSeleccionada] = useState({});
    const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState({});

    //Mascara

    //Formato fecha
    const formatDate = (string) => {
        if (string != "") {
            let fecha = new Date(string).toISOString().split('T')[0]
            return fecha;
        }
        return "";
    }

    //Funcion que permite actualizar el modelo vacio, para guardarlo o editarlo
    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value);
        setEmpleado(
            {//Destructuracion de empleado
                ...empleado,
                [e.target.name]: e.target.value
            });
    }

    //Metodo encargado de enviar datos al metodo guardarEmpleado de App.jsx, se envia por props
    const enviarDatos = () => {
        // Si no hay errores, proceder a guardar o editar el empleado
        setMascara(tipoDocumentoSeleccionado.mascara);
        let nuevosErrores = {};

        // Validar nombre
        if (!empleado.nombre.trim() || empleado.nombre.length > 100) {
            nuevosErrores.nombre = 'Nombres es requerido de no mas de 100 caracteres';
        }

        // Validar apellido
        if (!empleado.apellido.trim()) {
            nuevosErrores.apellido = 'Apellidos es requerido';
        }

        // Validar fecha de contratación
        if (!empleado.fechaContratacion.trim()) {
            nuevosErrores.fechaContratacion = 'FechaContratacion es requerida';
        }

        if (!empleado.subAreaId.trim()) {
            nuevosErrores.subAreaId = 'Seleccione un pais, area y una sub area';
        }


        if (!empleado.tipoDocumentoId.trim()) {
            nuevosErrores.tipoDocumentoId = 'Seleccione un Tipo de documento es requerido';
        }

        // Validar número de documento
        if (!empleado.numeroDocumento.trim()) {
            nuevosErrores.numeroDocumento = 'NumeroDocumento es requerido';
        } else {
            // Definir la máscara regex
            var regex = new RegExp(mascara);
            console.log(regex);
            //var regex = /^[0-9]{8}-[0-9]{1}$/;

            // Usar la máscara regex para validar el formato del número de documento
            if (!regex.test(empleado.numeroDocumento)) {
                nuevosErrores.numeroDocumento = 'Formato de NumeroDocumento invalido';
            }
        }

        // Validar número de documento
        if (!empleado.tipoDocumentoId.trim()) {
            nuevosErrores.tipoDocumentoId = 'Seleccione un Tipo de documento es requerido';
        }

        setErrores(nuevosErrores);

        // Si no hay errores, proceder a guardar o editar el empleado
        if (Object.keys(nuevosErrores).length === 0) {
            if (empleado.idEmpleado === null) {
                guardarEmpleado(empleado);
            } else {
                editarEmpleado(empleado);
            }
            setEmpleado(modeloEmpleado);
        }

    }

    //----------------------------------------- EDITAR-------------------------------------------------------------------\\\\\\\\
    useEffect(() => {
        if (editar != null) {
            console.log(editar)
            setEmpleado(editar)
            setTipoDocumentoSeleccionado(editar.tipoDocumento)
            setPaisSeleccionado(editar.subArea.area.pais)
            setAreaSeleccionada(editar.subArea.area)
            setSubAreaSeleccionada(editar.subArea)
        } else {
            setEmpleado(modeloEmpleado)
        }
    }, [editar])
    //------------------------------------------------------------------------------------------------

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
        setEmpleado(modeloEmpleado)
        setErrores({})
    }

    return (
        //la variable mostrarModal controla si esta abierto o cerrado se controla desde App.jsx
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {empleado.idEmpleado == null ? " Nuevo Empleado" : "Editar Empleado"}
            </ModalHeader>

            <ModalBody>
                <Form>
                    {/*El evento onchange se encarga de actualizar y enviar el value al modelo vacio */}
                    <FormGroup>
                        <Label bsSize="sm">Nombres</Label>
                        <Input name="nombre" bsSize="sm" onChange={(e) => actualizarDato(e)} onClick={(e) => actualizarDato(e)} value={empleado.nombre} />
                        {errores.nombre && <div className="text-danger">{errores.nombre}</div>}

                    </FormGroup>
                    <FormGroup>
                        <Label bsSize="sm">Apellidos</Label>
                        <Input name="apellido" bsSize="sm" onChange={(e) => actualizarDato(e)} onClick={(e) => actualizarDato(e)} value={empleado.apellido} />
                        {errores.apellido && <div className="text-danger">{errores.apellido}</div>}

                    </FormGroup>

                    <FormGroup>
                        <Label bsSize="sm">Selecciones el tipo de documento</Label>
                        <Select
                            actualizarDato={actualizarDato}
                            errores={errores}
                            tipoDocumentoSeleccionado={tipoDocumentoSeleccionado}
                            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionado}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label bsSize="sm">Numero de documento</Label>
                        <Input name="numeroDocumento" bsSize="sm" onChange={(e) => actualizarDato(e)} value={empleado.numeroDocumento} />
                        {errores.numeroDocumento && <div className="text-danger">{errores.numeroDocumento}</div>}

                    </FormGroup>

                    <FormGroup>
                        <Label bsSize="sm">Fecha de Contratacion</Label>
                        <Input name="fechaContratacion" type="date" bsSize="sm" onChange={(e) => actualizarDato(e)} onClick={(e) => actualizarDato(e)} value={formatDate(empleado.fechaContratacion)} />
                        {errores.fechaContratacion && <div className="text-danger">{errores.fechaContratacion}</div>}

                    </FormGroup>
                    <FormGroup>
                        <Label bsSize="sm">Seleccione su localidad</Label>
                        <SelectsVinculados
                            actualizarDato={actualizarDato}
                            errores={errores}
                            paisSeleccionado={paisSeleccionado}
                            setPaisSeleccionado={setPaisSeleccionado}
                            areaSeleccionada={areaSeleccionada}
                            setAreaSeleccionada={setAreaSeleccionada}
                            subAreaSeleccionada={subAreaSeleccionada}
                            setSubAreaSeleccionada={setSubAreaSeleccionada}
                        />

                    </FormGroup>

                </Form>

            </ModalBody>

            <ModalFooter>
                {/*El evento on click controla en metodo enviar datos, que ejecuta el metodo guardarDatos de App.jsx*/}
                <Button color="primary" bsSize="sm" className="me-2" onClick={enviarDatos}>Guardar</Button>
                {/*El evento on click posee una actualizacion de la variable que controla si el modal esta abierto o cerrado*/}
                <Button color="danger" bsSize="sm" className="me-2" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>

        </Modal>

    )
}

export default ModalEmpleado;