import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import {useParams} from "react-router";

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
    onClick: '',
}

const CommentBarChart = ({data}) => {
  var labels = data.map(d => d.year); 
  var yAxis  = data.map(d => d.comments);
  const history = useHistory();
  const {project_id, member_id} = useParams();

  const commentGraphClick = () => {
    history.push(`/overview/${project_id}/${member_id}/commentContribution`);
  }

  options.onClick = commentGraphClick;

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