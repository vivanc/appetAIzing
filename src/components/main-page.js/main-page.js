import React from "react";
import TopSection from "../top-section/top-section";
import LeftSection from "../left-section/left-section";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = () => {
    return (
        <Container fluid style={{height:"100%", width:"100vw"}}>
            <Row className="d-flex justify-content-center" style={{backgroundColor: "blanchedalmond", height: "10%", width:"100vw"}}>
                <Col className="d-flex align-items-center justify-content-center"><TopSection /></Col>
            </Row>
            <Row style={{height:"100vh", width:"auto"}}>
                <Col className="d-flex"><LeftSection /></Col>
                <Col >text and button</Col>
            </Row>
        </Container>
    );
}

export default MainPage;