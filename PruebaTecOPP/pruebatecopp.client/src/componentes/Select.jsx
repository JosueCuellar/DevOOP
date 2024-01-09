import { useEffect, useState } from "react";
import { Input } from 'reactstrap'

const Select = ({ actualizarDato,  errores,  tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado }) => {
    const [tipoDocumentos, setTipoDocumento] = useState([]);
    const mostrarTipoDocumento = async () => {
        const response = await fetch("api/tipoDocumento/Lista");
        if (response.ok) {
            const data = await response.json();
            setTipoDocumento(data)
        } else {
            console.log("ERROR");
        }
    };

    useEffect(() => {
        mostrarTipoDocumento();
    }, [])


    const cambiarTipoDocumento = () => {
        const tipoDocSeleccionado = tipoDocumentos.find(e => e.idTipoDocumento === event.target.value);
        setTipoDocumentoSeleccionado(tipoDocSeleccionado);
    }



    return (
        <div>
            <Input bsSize="sm" type="select" name="tipoDocumentoId" id="select-pais" value={tipoDocumentoSeleccionado.idTipoDocumento}
                onChange={(e) => {
                    cambiarTipoDocumento();
                    actualizarDato(e);
                }} defaultValue="default">
                <option value="default" disabled selected>Selecciona un Tipo de Documento</option>
                {tipoDocumentos && tipoDocumentos.map((item) => (
                    <option key={item.idTipoDocumento} value={item.idTipoDocumento}>
                        {item.nombreDocumento}
                    </option>
                ))}
            </Input>
            {errores.tipoDocumentoId && <div className="text-danger">{errores.tipoDocumentoId}</div>}


        </div>

    );

}

export default Select;