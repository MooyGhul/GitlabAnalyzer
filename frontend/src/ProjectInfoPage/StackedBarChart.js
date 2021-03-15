import { HorizontalBar } from "react-chartjs-2";

function StackedBarChart(props) {
  let colorListCommit = [];
  let colorListMR = [];
  let members = props.member;
  let commitsArray = props.commitsArray;
  let MRsArray = props.MRsArray;

  for (var i = 0; i < members.length; i++) {
    colorListCommit.push("rgba(53,63,196,0.7)");
  }

  for (i = 0; i < members.length; i++) {
    colorListMR.push("rgba(40, 240, 230, 0.7");
  }

  return (
    <div>
      <HorizontalBar
        data={{
          labels: members,
          datasets: [
            {
              label: "Commits",
              data: commitsArray,
              maintainAspectRatio: true,
              backgroundColor: colorListCommit,
              borderWidth: 4,
            },
            {
              label: "Merge requests",
              data: MRsArray,
              maintainAspectRatio: true,
              backgroundColor: colorListMR,
              borderWidth: 4,
            },
          ],
        }}
        options={{
          responsive: true,
          title: {
            display: true,
            text: "Code contribution",
            fontSize: 30,
          },

          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Members",
                },
                stacked: true,
              },
            ],
            yAxes: [
              {
                ticks: { beginAtZero: true },
                scaleLabel: {
                  display: true,
                  labelString: "Contribution",
                },
                stacked: true,
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default StackedBarChart;
