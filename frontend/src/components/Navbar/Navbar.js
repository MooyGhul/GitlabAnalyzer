import React from 'react';
import { MenuItems } from "./MenuItems";
import './Navbar.css';
import { Button } from './Button';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const [clicked, setclicked] = React.useState(false);
  //state = { clicked: false}
  const history = useHistory();

  const handleClick = () => {
    setclicked(!clicked);
  }

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">gitanalyzer  <i className="fab fa-gitlab"></i></h1>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <h3 className={item.cName} onClick={() => history.push('/overview/2/katelynk')}>
                {item.title}
              </h3>
            </li>
          )
        })}
      </ul>
      <Button>Sign out</Button>
    </nav>
  )
} 

export default Navbar;