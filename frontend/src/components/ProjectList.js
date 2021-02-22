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
        { id: 1, project: 'Sudoku solver', date: '02-03-2019' },
        { id: 2, project: 'Packman game', date: '02-03-2019' },
        { id: 3, project: 'Pygame project', date: '02-03-2019' },
        { id: 4, project: 'CMPT 276 Lens calculator', date: '02-03-2019' },
        { id: 5, project: 'CMPT 276 Minegame', date: '02-03-2019' },
        { id: 6, project: 'A* search', date: '02-03-2019' },
        { id: 7, project: 'Project 2', date: '02-03-2019' },
        { id: 8, project: 'CMPT 300 ass2', date: '02-03-2019' },
        { id: 9, project: 'Sedna - project', date: '02-03-2019' },
        { id: 10, project: 'sudoku solver', date: '02-03-2019' },
        { id: 11, project: 'sudoku solver', date: '02-03-2019' },
        { id: 12, project: 'sudoku solver', date: '02-03-2019' },
        { id: 13, project: 'sudoku solver', date: '02-03-2019' },
        { id: 14, project: 'sudoku solver', date: '02-03-2019' },
      ]
    
    return (
        <div className={styles.projectList}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 2 }}>
                <DataGrid rows={rows} columns={columns} pageSize={10} checkboxSelection />
                </div>
            </div>
    </div> 
    );
    }

    export default ProjectList;