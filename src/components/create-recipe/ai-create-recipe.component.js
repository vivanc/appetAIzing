import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AICreateRecipe = () => {
    console.log("ai recipe is rendring");
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Create a Recipe by AI</Form.Label>
                    <Form.Control type="test" placeholder="https://..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit URL
                </Button>

            </Form>

        </>
    )

}

export default AICreateRecipe;