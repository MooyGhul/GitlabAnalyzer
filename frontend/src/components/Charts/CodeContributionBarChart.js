import React from 'react';
import { Bar } from 'react-chartjs-2';

//TODO: insert page routing
const graphClick = () => {
  return(
    <div>{console.log('test bar chart button click')}</div>
  )
}

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
    onClick: graphClick,
}

const CodeContributionBarChart = ({data}) => {
  if (data) {
    var labels = data.map(d => d.year);
    var numMergeRequests = data.map(d => d.MRDaily);
    var numCommits = data.map(d => d.CommitDaily);
  }

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