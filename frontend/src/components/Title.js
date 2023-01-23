import './Title.css';
import { Container, Row, Col } from 'react-bootstrap';

const Title = () => {
    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <h1 className="title-text">Recipe Search</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default Title;
