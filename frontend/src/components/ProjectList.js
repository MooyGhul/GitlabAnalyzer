import React from 'react';   
import styles from "../style/projectList.module.css"
import { DataGrid } from '@material-ui/data-grid';


const ProjectList = (props) => {
        
    const columns = [
        { field: 'id', headerName: 'ID', width:70 },
        { field: 'project', headerName: 'Project', width: 400 },
        { field: 'date', headerName: 'Date', width:130 },         
    ]

    const rows = [
        { id: 1, project: 'sudoku solver', date: '02-03-2019' },
        { id: 2, project: 'sudoku solver', date: '02-03-2019' },
        { id: 3, project: 'sudoku solver', date: '02-03-2019' },
        { id: 4, project: 'sudoku solver', date: '02-03-2019' },
        { id: 5, project: 'sudoku solver', date: '02-03-2019' },
        { id: 6, project: 'sudoku solver', date: '02-03-2019' },
        { id: 7, project: 'sudoku solver', date: '02-03-2019' },
        { id: 8, project: 'sudoku solver', date: '02-03-2019' },
        { id: 9, project: 'sudoku solver', date: '02-03-2019' },
        { id: 10, project: 'sudoku solver', date: '02-03-2019' },
        { id: 11, project: 'sudoku solver', date: '02-03-2019' },
        { id: 12, project: 'sudoku solver', date: '02-03-2019' },
        { id: 13, project: 'sudoku solver', date: '02-03-2019' },
        { id: 14, project: 'sudoku solver', date: '02-03-2019' },
      ]
    
    return (
        <div className={styles.projectList}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
                </div>
            </div>
    </div> 
    );
    }

    export default ProjectList;