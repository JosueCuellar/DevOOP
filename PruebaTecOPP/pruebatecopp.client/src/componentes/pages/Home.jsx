import React from 'react';
import { Container, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, } from "reactstrap"
import { Link } from 'react-router-dom';


function Home() {
    return (
        <Container>
            <br></br>
            <br></br>

            <UncontrolledAccordion
                defaultOpen={[
                    '1',
                    '2', '3'
                ]}
                stayOpen>
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        Registro de Empleados
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        Esta aplicacion permite la creacion de los campos de los empleados.
                        {/*<Link to="/gestionEmpleados" className=""> Gestion Empleados</Link>*/}

                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="2">
                        Editar Empleados
                    </AccordionHeader>
                    <AccordionBody accordionId="2">
                            Esta aplicacion permite la edicion de los campos de los empleados.                           
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="3">
                        Buscar Empleados
                    </AccordionHeader>
                    <AccordionBody accordionId="3">
                    
                            Puedes buscar empleados por su nombre, por su numero de documento o por ambos.
                     
                    </AccordionBody>
                </AccordionItem>
            </UncontrolledAccordion>
        </Container>
    );
}

export default Home;