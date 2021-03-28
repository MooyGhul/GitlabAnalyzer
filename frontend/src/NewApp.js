import React,{useState} from 'react';
import NavbarSide from './NavbarSide';

function NewApp() {
  const [project_id, setProject_id] = useState();
  const [member_id, setMember_id] = useState();
  
  const test = "HELLO WORLD TEST!"

  return (
    < NavbarSide 
      project_id={project_id} 
      member_id={member_id} 
      setProject_id={setProject_id} 
      setMember_id={setMember_id}  
      test={test}/>
  )
};

export default NewApp;