import React from 'react';
import { Bar } from 'react-chartjs-2';

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
    }
}

const StackedBarChart = ({data}) => {
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
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '#Commits Per Day',
        data: numCommits,
        backgroundColor: 'rgb(54, 162, 235)',
      },
    ],
  }
  
  return(
      <Bar data={dataConfig} options={options}/>
  )
}

export default StackedBarChart;