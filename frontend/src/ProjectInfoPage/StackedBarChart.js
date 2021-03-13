import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import axios from "axios";

function StackedBarChart(props) {
  const [commits, setCommits] = useState([]);
  const [MRs, setMRs] = useState([]);

  let colorListCommit = []; 
  let colorListMR = [];
  let members = props.member;
  let projectID = props.projectID;
  let commitsArray = [];
  let MRsArray = [];

  for (var i = 0; i < members.length; i++) {
    colorListCommit.push("rgba(53,63,196,0.7)");
  }

  for (i = 0; i < members.length; i++) {
    colorListMR.push("rgba(40, 240, 230, 0.7");
  }

  useEffect(() => {
    const fetchData = async () => {
      const commitData = await axios.get(
        `http://localhost:8080/project/${projectID}/commits`
      );

      setCommits(commitData.data);
    };
    fetchData();
  }, [projectID]);

  useEffect(() => {
    const fetchData = async () => {
      const mrData = await axios.get(
        `http://localhost:8080/project/${projectID}/merge_requests`
      );
      setMRs(mrData.data);
    };
    fetchData();
  }, [projectID]);
  
  members.forEach((member) => {
    let count = 0;
    commits.forEach((commit) => {
      if (member === commit.author) {
        count++;
      }
    });
    commitsArray.push(count);
  });

  members.forEach((member) => {
    let count = 0;
    MRs.forEach((MR) => {
      if (member === MR.author) {
        count++;
      }
    });
    MRsArray.push(count);
  });

  return (
    <div>
      <div>
        <HorizontalBar
          data={{
            labels: members,
            datasets: [
              {
                label: "Commits",
                data: commitsArray,
                maintainAspectRatio: true,
                backgroundColor: colorListCommit,
                borderWidth: 4,
              },
              {
                label: "Merge requests",
                data: MRsArray,
                maintainAspectRatio: true,
                backgroundColor: colorListMR,
                borderWidth: 4,
              },
            ],
          }}
          options={{
            responsive: true,
            title: {
              display: true,
              text: "Code contribution",
              fontSize: 30,
            },

            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Members",
                  },
                  stacked: true,
                },
              ],
              yAxes: [
                {
                  ticks: { beginAtZero: true },
                  scaleLabel: {
                    display: true,
                    labelString: "Contribution",
                  },
                  stacked: true,
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default StackedBarChart;
