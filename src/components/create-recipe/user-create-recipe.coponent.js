import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserCreateRecipe = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control as="textarea" rows={8} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Steps</Form.Label>
          <Form.Control as="textarea" rows={8} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Picture</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Recipe
        </Button>

      </Form>
    </>
  )
};

export default UserCreateRecipe;
