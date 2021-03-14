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
    var labels = data.map(d => {return d.year});
    var numMergeRequests = data.map(d => d.MRDaily);
    var numCommits = data.map(d => d.CommitDaily);
  }

  const dataConfig = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# MRs Per Day',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgb(255, 99, 132)',
      },
      {
        label: '#Commits Per Day',
        data: [2, 3, 20, 5, 1, 4],
        backgroundColor: 'rgb(54, 162, 235)',
      },
    ],
  }
  
  return(
      <Bar data={dataConfig} options={options}/>
  )
}

export default StackedBarChart;