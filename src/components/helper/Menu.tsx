import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavigateFunction, useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserAccount } from '../login/model/UserAccount';
import { createContext, useContext } from 'react';
import { UserAccountContext } from '../../App';


interface MenuProps {
    className: string;
}

const Menu = (props: MenuProps) => {
    
    const userAccountContext = useContext(UserAccountContext);

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
                {userAccountContext?.userAccount?.roleId && userAccountContext?.userAccount?.roleId === parseInt(process.env.REACT_APP_ROLE_ADMIN as string) &&
                <NavDropdown title = "Users" id = "nav-dropdown" className = 'nav-dropdown' onSelect = {handleMenuSelect}>
                    <NavDropdown.Item eventKey={"/userlist"}>
                        Users
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey={"/searchuser"}>
                        Search
                    </NavDropdown.Item>
                </NavDropdown>
                }
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