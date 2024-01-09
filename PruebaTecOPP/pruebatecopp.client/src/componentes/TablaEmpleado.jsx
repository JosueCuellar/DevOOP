import { Table, Button } from 'reactstrap'

const TablaEmpleado = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarEmpleado }) => {

    //Formato fecha
    const formatDate = (string) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let fecha = new Date(string).toLocaleDateString("es-PE", options);
        return fecha;
    }

    //Funcion para enviar los datos del editar
    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }


    return (
        <Table bordered
            hover
            responsive
            size="sm">
            <thead>
                <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Tipo de Documento</th>
                    <th>Numero de Documento</th>
                    <th>Fecha de Contratacion</th>
                    <th>Pais</th>
                    <th>Region</th>
                    <th>SubRegion</th>
                    
                    <th>Opciones</th></tr>
            </thead>
            <tbody>
                {
                    (data.length === 0) ?
                        (
                            <tr>
                                <td colSpan="9">Sin registro</td>
                            </tr>
                        ) :
                        (data.map((item) => (
                            item.subArea && item.subArea.area ? // Verifica si el objeto tiene la propiedad area
                                <tr key={item.idEmpleado}>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido}</td>
                                    <td>{item.tipoDocumento.nombreDocumento}</td>
                                    <td>{item.numeroDocumento}</td>
                                    <td>{formatDate(item.fechaContratacion)}</td>
                                    <td>{item.subArea.area.pais.nombrePais}</td>
                                    <td>{item.subArea.area.nombreArea}</td>
                                    <td>{item.subArea.nombreSubArea}</td>                                   
                                    <td>
                                        <Button color="primary" size="sm" className="me-1" onClick={() => { enviarDatos(item) }}>Editar</Button>
                                        <Button color="danger" size="sm" className="me-1" onClick={() => { eliminarEmpleado(item.idEmpleado) }}>Eliminar</Button>
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td colSpan="9">Objeto sin propiedad area</td>
                                </tr>
                        )))
                }
            </tbody>
        </Table>
    );

}

export default TablaEmpleado;