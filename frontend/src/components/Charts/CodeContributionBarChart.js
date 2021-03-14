import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import {useParams} from "react-router";

const options = {
    scales: {
        yAxes: [
            {
                stacked: true,
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
        xAxes: [
            {
                stacked: true,
            }
        ]
    }, 
    onClick: '',
}

const CodeContributionBarChart = ({data}) => {
  var labels = data.map(d => d.year);
  var numMergeRequests = data.map(d => d.MRDaily);
  var numCommits = data.map(d => d.CommitDaily);
  const history = useHistory();
  const {project_id, member_id} = useParams();

  const graphClick = () => {
    history.push(`/overview/${project_id}/${member_id}/codeContribution`);
  }

  options.onClick = graphClick;

  const dataConfig = {
    labels: labels,
    datasets: [
      {
        label: '# MRs Per Day',
        data: numMergeRequests,
        backgroundColor: 'rgb(252, 128, 83)',
      },
      {
        label: '#Commits Per Day',
        data: numCommits,
        backgroundColor: 'rgb(97, 121, 255)',
      },
    ],
  }
  
  return(
      <Bar data={dataConfig} options={options}/>
  )
}

export default CodeContributionBarChart;