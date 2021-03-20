import React,{useEffect,useState} from 'react';
import './Navbar.css';
import axios from "axios";
import {Button} from './Button';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';

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
  const [clicked, setclicked] = useState(false);
  const [projectName, setProjectName] = useState([]);
  const {project_id, member_id} = useParams();
  const history = useHistory();

  const MenuItems = buildItems(project_id,member_id);

  const handleMenuClick = () => {
    setclicked(!clicked);
  }

  const handleRedirect = (event,item) => {
    if(item.title==='Sign Out'){
      window.location = 'https://cas.sfu.ca/cas/logout';
    }
    else{
      history.push({
        pathname: item.url,
        state: { id: project_id, projectName: projectName },
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let getProjectNameUrl = `/project/${project_id}`;

      if(process.env.NODE_ENV === 'development') {
        getProjectNameUrl = `${process.env.REACT_APP_DEVHOST}/project/${project_id}`
      }

      const resultCommit = await axios.get(getProjectNameUrl);
      setProjectName(resultCommit.data);

      console.log("Navbar PAGE => ");
      console.log(projectName);
      console.log("END OF Navbar PAGE!");
    };
    fetchData()
      .then(()=> {
        console.log('Successful data retrieval (project_id, projectName)');
      }).catch(() => {
      console.log('Failed retrieve data (project_id, projectName)');
    });
  },[project_id, projectName]);

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">{projectName}  <i className="fab fa-gitlab"></i></h1>
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