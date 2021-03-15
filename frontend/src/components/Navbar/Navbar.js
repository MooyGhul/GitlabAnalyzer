import React from 'react';
//import { MenuItems } from "./MenuItems";
import './Navbar.css';
import { Button } from './Button';
import {useParams} from 'react-router';
import { useHistory } from 'react-router-dom';

const buildItems = (project_id,member_id) =>{
  return (
    [
      {
        title: 'Overall',
        url: `/overview/${project_id}/${member_id}`,
        cName: 'nav-links'
      },
      {
        title: 'Code Contribution',
        url: `/overview/${project_id}/${member_id}/CodeContribution`,
        cName: 'nav-links'
      },
      {
        title: 'Issue Contribution',
        url: `/overview/${project_id}/${member_id}/issueContribution`,
        cName: 'nav-links'
      },
      {
        title: 'Comment Contribution',
        url: `/overview/${project_id}/${member_id}/CommentContribution`,
        cName: 'nav-links'
      },
      {
        title: 'Sign Out',
        url: `/overview/${project_id}/${member_id}/*`,
        cName: 'nav-links-mobile'
      },
    ]
  );
} 

function Navbar() {
  const [clicked, setclicked] = React.useState(false);
  const {project_id, member_id} = useParams();
  //state = { clicked: false}
  const history = useHistory();

  const MenuItems = buildItems(project_id,member_id);

  console.log("START of NAVBAR");
  console.log("project_id is :"+project_id);
  console.log("member_id is :"+member_id);
  console.log("END of NAVBAR");

  const handleMenuClick = () => {
    setclicked(!clicked);
  }

  // const handleRedirect = () => {
  //   history.push('/overview/2/katelynk')
  // }

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">gitanalyzer  <i className="fab fa-gitlab"></i></h1>
      <div className="menu-icon" onClick={handleMenuClick}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              {/* onClick={() => history.push(item.url)} */}
              <h3 className={item.cName} onClick={() => history.push(item.url)}>
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