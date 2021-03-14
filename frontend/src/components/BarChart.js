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
    var backgroundColour;
    
    if (comment) {
        dataTitle = '# of Comments';
        yAxis = data.map(d => d.comments);
        backgroundColour = 'rgba(52, 225, 235)';
    }

    if (issue) {
        dataTitle = 'Issue Word Count';
        yAxis = data.map(d => d.IssueWordCount);
        backgroundColour = 'rgba(174, 118, 219)';
    }


    const dataConfig = {
        labels: labels,
        datasets: [
          {
            label: dataTitle,
            data: yAxis,
            backgroundColor: backgroundColour,
          },
        ],
      }

    return (
        <Bar data={dataConfig} options={options}/>
    )
}

export default BarChart;