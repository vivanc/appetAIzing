import AICreateRecipe from "./ai-create-recipe.component";
import UserCreateRecipe from "./user-create-recipe.coponent";
import TopSection from "../top-section/top-section.component";
import IntroLeftSection from "../intro-left-section/intro-left-section.component";
import { Container, Row, Col } from "react-bootstrap";

const CreateRecipe = () => {
    console.log("create recipe page is rendering");
    return (
        <>
            <Container>
                <Row style={{ height: "10vh", width: "100vw" }}>
                    <Col ><TopSection /></Col>
                </Row>
                <Row style={{ height: "90vh", width: "100vw" }}>
                    <Col ><IntroLeftSection /></Col>
                    <Col >
                        <div>
                            <AICreateRecipe />
                            <h5>OR</h5>
                            <UserCreateRecipe />
                        </div>

                    </Col>
                </Row>
            </Container>

        </>
    )

}

export default CreateRecipe;