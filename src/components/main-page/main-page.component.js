import React from "react";
import TopSection from "../top-section/top-section.component";
import LeftSection from "../left-section/left-section.component";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = () => {
    return (
        <Container >
            <Row style={{height:"10vh", width:"100vw"}}>
                <Col ><TopSection/></Col>
            </Row>
            <Row style={{height:"90vh", width:"100vw"}}>
                <Col ><LeftSection /></Col>
                <Col >text and button</Col>
            </Row>
        </Container>
    );
}
/*
<Row className="d-flex justify-content-center" style={{backgroundColor: "blanchedalmond", height: "10%", width:"100vw"}}>
                <Col ><TopSection className="d-flex align-items-center justify-content-center"/></Col>
            </Row>
*/

export default MainPage;