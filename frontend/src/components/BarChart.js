import React from 'react';
import { Bar } from 'react-chartjs-2';

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
  }

const BarChart = ({data, comment, issue}) => {
    var labels = data.map(d => d.year); 
    var yAxis; 
    var dataTitle; 
    if (comment) {
        dataTitle = '# of Comments';
    }

    if (issue) {
        dataTitle = 'Issue Word Count';
        yAxis = data.map(d => d.IssueWordCount);
    }


    const dataConfig = {
        labels: labels,
        datasets: [
          {
            label: dataTitle,
            data: yAxis,
            backgroundColor: 'rgba(255, 99, 132)',
          },
        ],
      }

    return (
        <Bar data={dataConfig} options={options}>{console.log(issue)}</Bar>
    )
}

export default BarChart;