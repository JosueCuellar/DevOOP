
import { Form, Input, Label, Col, Row } from 'reactstrap';

const Search = ({ setNombreBusqueda, updatePageNumber, setDocumentoBusqueda }) => {

    return (
        <Form>
          
            <Row>
                <Col md={6}>
                    <Label/>
                    <Input
                        onChange={(e) => {
                            updatePageNumber(1);
                            setNombreBusqueda(e.target.value);
                        }}
                        id="nombreEmpleado"
                        name="nombreEmpleado"
                        placeholder="Nombre de Empleado"
                        type="search"
                    />
                </Col>


                <Col md={6}>
                    <Label />
                    <Input
                        onChange={(e) => {
                            updatePageNumber(1);
                            setDocumentoBusqueda(e.target.value);
                        }}
                        placeholder="Numero de Documento "
                        className="form-group col-sm-6"
                        type="search"
                    />
                </Col>

            </Row>

        </Form>
    )
}

export default Search;