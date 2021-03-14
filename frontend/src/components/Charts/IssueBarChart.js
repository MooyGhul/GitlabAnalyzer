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

const IssueBarChart = ({data}) => {
    var labels = data.map(d => d.year); 
    var yAxis = data.map(d => d.IssueWordCount);
    const history = useHistory();
    const {project_id, member_id} = useParams();

    const issueGraphClick = () => {
      history.push(`/overview/${project_id}/${member_id}/issueContribution`);
    }

    options.onClick = issueGraphClick;

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