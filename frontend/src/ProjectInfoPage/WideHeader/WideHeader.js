import React from "react";
import styles from "./WideHeader.module.css";

function WideHeader() {
  return (
    <div className={styles.body}>
      <img
        src="https://img.icons8.com/dusk/64/000000/sudoku.png"
        alt="avatar"
        className={styles.avatar}
      />

      <div className={styles.basicInfo}>
        <h1>Sudoku Solver</h1>
        <h3> Project ID: 142132</h3>
      </div>

      <div className={styles.memberAndDate}>
        <img
          src="https://img.icons8.com/windows/32/000000/group-background-selected.png"
          alt="memberIcon"
        />
        <h3>8 members</h3>

        <h3> Project start date: Februrary 1, 2021 </h3>
        <h3> Project end date: February 20, 2021</h3>
      </div>
    </div>
  );
}

export default WideHeader;
