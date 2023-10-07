import React from "react";
import TopSection from "../top-section/top-section.component";
import IntroLeftSection from "../intro-left-section/intro-left-section.component";
import IntroRightSection from "../intro-right-section/intro-right-section.component";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = (props) => {
    const rightPart = props;
    return (
        <div >
            <Container>
                <Row style={{ height: "10vh", width: "100vw" }}>
                    <Col ><TopSection /></Col>
                </Row>
                <Row style={{ height: "90vh", width: "100vw" }}>
                    <Col ><IntroLeftSection /></Col>
                    <Col ><IntroRightSection /></Col>
                </Row>
            </Container>

        </div>
    );
}

export default MainPage;