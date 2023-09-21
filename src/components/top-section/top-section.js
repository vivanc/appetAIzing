import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./top-section.styles.css";

const TopSection = () => {
    console.log("Top section is rendering");
    return (
        <Container fluid className="top-section">
            <Row>
                <Col>AppetAIzing</Col>
            </Row>
        </Container>
    )
}

export default TopSection;