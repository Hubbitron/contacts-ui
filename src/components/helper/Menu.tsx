import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavigateFunction, useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

interface MenuProps {
    className: string;
}

const Menu = (props: MenuProps) => {
    
    let navigate: NavigateFunction = useNavigate();

    const handleMenuSelect = (path: any) => {
        navigate(path);
    }
  
    return (
    <div className = {props.className}>
        <Navbar className = "topnav" variant = "">
            <Nav>
                <NavDropdown title = "Contact List" id = "nav-dropdown" className = 'nav-dropdown' onSelect = {handleMenuSelect}>
                    <NavDropdown.Item eventKey={"/contactlist"}>
                        Contact List
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey={"/searchcontact"}>
                        Search
                    </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={() => handleMenuSelect("/aboutpage")}>
                    <div className='menu-link'>
                        About
                    </div>
                </Nav.Link>
            </Nav>
        </Navbar>
    </div>
  )
}

export default Menu