import { useEffect, useState } from "react";
import { Input } from "reactstrap"


const SelectsVinculados = ({ actualizarDato, errores,  paisSeleccionado, setPaisSeleccionado, areaSeleccionada, setAreaSeleccionada, subAreaSeleccionada, setSubAreaSeleccionada }) => {

    const [paises, setPais] = useState([]);
    const [areas, setArea] = useState([]);
    const [subAreas, setSubArea] = useState([]);

    if (subAreaSeleccionada.subAreaId) {
        setSubArea([]);
        setArea([]);
        setPais([]);
    }

    const mostrarPaises = async () => {
        const response = await fetch("api/pais/Lista");
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setPais(data)
        } else {
            console.log("ERROR");
        }
    };

    useEffect(() => {
        mostrarPaises();
    }, [])

    //Traer datos de areas

    const mostrarAreas = async () => {
        const response = await fetch("api/pais/ListaAreas/" + paisSeleccionado.idPais);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setArea(data)
        } else {
            console.log("ERROR");
        }
    };

    useEffect(() => {
        if (paisSeleccionado.idPais) {
            mostrarAreas();
        }
    }, [paisSeleccionado])



    const mostrarSubAreas = async () => {
        const response = await fetch("api/pais/ListaSubAreas/" + areaSeleccionada.idArea);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setSubArea(data)
        } else {
            console.log("ERROR");
        }
    };

    useEffect(() => {
        if (areaSeleccionada.idArea && paisSeleccionado.idPais) {
            mostrarSubAreas();
        }
    }, [areaSeleccionada])


    const cambiarPais = () => {
        if (subAreas.idSubArea) {
            mostrarPaises();
        }
        const paisSeleccionado = paises.find(e => e.idPais === event.target.value);
        setAreaSeleccionada({ idArea: "default", nombreArea: "Selecciona un area" });
        setSubAreaSeleccionada({
            idSubArea: "default", nombreSubArea: "Selecciona una subarea"
        });
        setPaisSeleccionado(paisSeleccionado);
    }

    const cambiarArea = () => {
        const areaSeleccionada = areas.find(e => e.idArea === event.target.value);
        setSubAreaSeleccionada({
            idSubArea: "default", nombreSubArea: "Selecciona una subarea"
        });
        setAreaSeleccionada(areaSeleccionada);
    }

    const cambiarSubArea = () => {
        const subAreaSeleccionada = subAreas.find(e => e.idSubArea === event.target.value);
        setSubAreaSeleccionada(subAreaSeleccionada);
    }
    console.log(errores)

    return (
        <div>
            <Input bsSize="sm" type="select" name="select-pais" id="select-pais" value={paisSeleccionado.idPais}
                onChange={cambiarPais} defaultValue="default">
                <option value="default" disabled selected>Selecciona un pais</option>
                {paises && paises.map((item) => (
                    <option key={item.idPais} value={item.idPais}>
                        {item.nombrePais}
                    </option>
                ))}
            </Input>
            <hr></hr>

            <Input
                bsSize="sm" type="select" name="select-area" id="select-area" value={areaSeleccionada.idArea}
                onChange={cambiarArea} defaultValue="default">
                <option value="default" disabled selected>Selecciona un area</option>
                {areas && areas.map((item) => (
                    <option key={item.idArea} value={item.idArea}>
                        {item.nombreArea}
                    </option>
                ))}
            </Input>
            <hr></hr>

            <Input
                bsSize="sm" type="select" name="subAreaId" id="subAreaId" value={subAreaSeleccionada.idSubArea}
                onChange={(e) => {
                    cambiarSubArea();
                    actualizarDato(e);
                }} defaultValue="default">
                <option value="default" disabled selected>Selecciona una subarea</option>
                {subAreas && subAreas.map((item) => (
                    <option key={item.idSubArea} value={item.idSubArea}>
                        {item.nombreSubArea}
                    </option>
                ))}
            </Input>
            {errores.subAreaId && <div className="text-danger">{errores.subAreaId}</div>}

        </div >
    );
}

export default SelectsVinculados;