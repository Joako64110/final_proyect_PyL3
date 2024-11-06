import { Container, Navbar } from "react-bootstrap"
import logo from '../../../assets/logo.svg';
import './Header.css';

export const Header = () => {
    return (
        <Navbar className="navBar">
            <Container className="navContainer">
                <div style={{backgroundColor:"aliceblue"}}>
                    <img
                        alt=""
                        src={logo}
                        width="60px"
                        className="d-inline-block align-top"
                    />{' '}
                </div>
                <h4 style={{color:"aliceblue", marginTop:"7px"}}>Enterprise Control</h4>
            </Container>
        </Navbar>
    )
}
