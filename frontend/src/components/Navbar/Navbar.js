import React from 'react';
import './Navbar.css';
import { Button } from './Button';
import {useParams} from 'react-router';
import { useHistory } from 'react-router-dom';
import Authentication from "../../Authentication";

const buildItems = (project_id,member_id) =>{
  return (
    [
      {
        title: 'Project Info Page(TODO)',
        url: `/projectInfo/${project_id}, state: { ${project_id}, projectName: gitlabanalyzer },`,
        cName: 'nav-links'
      },
      {
        title: 'Overall Contribution',
        url: `/overview/${project_id}/${member_id}`,
        cName: 'nav-links'
      },
      {
        title: 'Code Contribution',
        url: `/overview/${project_id}/${member_id}/codeContribution`,
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
        url: `https://cas.sfu.ca/cas/logout`,
        cName: 'nav-links-mobile'
      },
    ]
  );
} 

function Navbar() {
  const [clicked, setclicked] = React.useState(false);
  const {project_id, member_id} = useParams();
  const history = useHistory();

  const MenuItems = buildItems(project_id,member_id);

  const handleMenuClick = () => {
    setclicked(!clicked);
  }

  const handleRedirect = (event,item) => {
    if(item.title==='Sign Out'){
      Authentication.onLogout();
      window.location = 'https://cas.sfu.ca/cas/logout';
    }
    else{
      history.push(item.url);
    }
  }

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
              <h3 className={item.cName} onClick={(event) => handleRedirect(event,item)}>
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