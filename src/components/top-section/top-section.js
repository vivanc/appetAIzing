import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./top-section.styles.css";

const TopSection = () => {
    return (
        <Container className="d-flex justify-content-center" fluid style={{backgroundColor: "blanchedalmond", height: "10%"}}>
            <Row className="d-flex">
                <Col className="d-flex align-items-center">
                <h1 className="d-flex">AppetAIzing</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default TopSection;