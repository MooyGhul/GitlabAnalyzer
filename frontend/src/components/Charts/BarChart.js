import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import {useParams} from "react-router";


const BarChart = ({data, issue, comment, codeContribution, barLabel1, barColour1, barLabel2, barColour2}) => {
    const history = useHistory();
    const {project_id, member_id} = useParams();
    var labels = data.map(d => d.year); 
    var yAxis1;
    var yAxis2; 

    var options = {
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
    };

    var dataConfig = {
        labels: labels,
        datasets: [
          {
            label: barLabel1,
            data: '',
            backgroundColor: barColour1,
          },
        ],
    };

    if (issue) {
        yAxis1 = data.map(d => d.IssueWordCount);
        /*
        options.onClick = () => {
            history.push(`/overview/${project_id}/${member_id}/issueContribution`);
        }
        */
    }

    if (comment) {
        yAxis1  = data.map(d => d.comments);
        /*
        options.onClick = () => {
            history.push(`/overview/${project_id}/${member_id}/commentContribution`);
        }
        */
    }

    if (codeContribution) {
        yAxis1 = data.map(d => d.MRDaily);
        yAxis2 = data.map(d => d.CommitDaily);

        options.scales.yAxes[0]['stacked'] = true;
        options.scales['xAxes'] = [{'stacked': true}];
        /*
        options.onClick = () => {
            history.push(`/overview/${project_id}/${member_id}/codeContribution`);
        };*/
        dataConfig.datasets.push({
            label: barLabel2, 
            data: yAxis2, 
            backgroundColor: barColour2,
        });
    }

    dataConfig.datasets[0].data = yAxis1;

    return(
        <Bar data={dataConfig} options={options}>{console.log(dataConfig)}</Bar>
    )

}

export default BarChart; 