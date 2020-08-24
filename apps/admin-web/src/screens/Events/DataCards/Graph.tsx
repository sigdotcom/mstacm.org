import React from "react";
import { Line } from "react-chartjs-2";

const state = {
  labels: [""], //temp placeholder data
  datasets: [
    {
      label: "",
      fill: false,

      lineTension: 0.5,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [0, 0, 0, 0, 0],
    },
  ],
};

const Graph: React.SFC<{}> = (): JSX.Element => {
  return (
    <div>
      <Line
        data={state}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          title: {
            display: true,
          },
          legend: {
            display: false,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export { Graph };
