import React, {useState} from 'react'
import ProjectNotSelected from './ProjectNotSelected'

const useProjectNotSelected = (props) => {
    const [projectSelected, setProjectSelected] = useState(props.projectSelected)   
    console.log(props.projectSelected)
    return([
        projectSelected ? <ProjectNotSelected /> : null,
        () => setProjectSelected(true), 
        () => setProjectSelected(false)
    ]
    )
}
export default useProjectNotSelected