import React from 'react';
import { Bar } from 'react-chartjs-2';

//TODO: insert page routing
const commentGraphClick = () => {
    return(
        <div>{console.log('comment graph click')}</div>
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
    onClick: commentGraphClick,
}

const CommentBarChart = ({data}) => {
  var labels = data.map(d => d.year); 
  var yAxis  = data.map(d => d.comments);

    const dataConfig = {
        labels: labels,
        datasets: [
          {
            label: '# of Comments',
            data: yAxis,
            backgroundColor: 'rgba(52, 225, 235)',
          },
        ],
      }

    return (
        <Bar data={dataConfig} options={options}>{console.log(data)}</Bar>
    )
}

export default CommentBarChart;