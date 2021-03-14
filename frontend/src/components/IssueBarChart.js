import React from 'react';
import { Bar } from 'react-chartjs-2';

//TODO: insert page routing
const issueGraphClick = () => {
    return(
        <div>{console.log('issue graph click')}</div>
    )
}

const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    onClick: issueGraphClick,
}

const IssueBarChart = ({data}) => {
    var labels = data.map(d => d.year); 
    var yAxis = data.map(d => d.IssueWordCount);

    const dataConfig = {
        labels: labels,
        datasets: [
          {
            label: 'Issue Word Count',
            data: yAxis,
            backgroundColor: 'rgba(174, 118, 219)',
          },
        ],
      }

    return (
        <Bar data={dataConfig} options={options}/>
    )
}

export default IssueBarChart;