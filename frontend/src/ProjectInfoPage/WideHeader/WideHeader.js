import React from "react";
import styles from "./WideHeader.module.css";
 
const WideHeader = (props) => { 
 
  return (
    <div className={styles.body}>
      <img
        src="https://img.icons8.com/dusk/64/000000/sudoku.png"
        alt="avatar"
        className={styles.avatar}
      />

      <div className={styles.basicInfo}>
        <h1> {props.projectName} </h1>
        <h3> Project ID: {props.id}</h3>
      </div>

    
    </div>
  );
}

export default WideHeader;
