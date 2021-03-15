import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = ({data, issue, comment, codeContribution, barLabel1, barColour1, barLabel2, barColour2}) => {
    var xAxis = data.map(d => d.year); 
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
        labels: xAxis,
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
    }

    if (comment) {
        yAxis1  = data.map(d => d.comments);
    }

    if (codeContribution) {
        yAxis1 = data.map(d => d.MRDaily);
        yAxis2 = data.map(d => d.CommitDaily);

        options.scales.yAxes[0]['stacked'] = true;
        options.scales['xAxes'] = [{'stacked': true}];

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