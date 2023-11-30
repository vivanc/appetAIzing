import React from "react";
import TopSection from "../top-section/top-section.component";
import IntroLeftSection from "../intro-left-section/intro-left-section.component";
import IntroRightSection from "../intro-right-section/intro-right-section.component";
import { Container, Row, Col } from "react-bootstrap";

const MainPage = () => {
    return (
        <div >
                <Row style={{ height: "10vh" }}>
                    <Col ><TopSection /></Col>
                </Row>
                <Row style={{ height: "90vh" }}>
                    <Col ><IntroLeftSection /></Col>
                    <Col ><IntroRightSection /></Col>
                </Row>
        </div>
    );
}

export default MainPage;