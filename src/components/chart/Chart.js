import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Min',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: '#B43E5A',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#B43E5A',
      pointBackgroundColor: '#B43E5A',
      pointBorderWidth: 8,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
  },
  {
    label: 'Max',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: '#000',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: '#000',
    pointBackgroundColor: '#B43E5A',
    pointBorderWidth: 8,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [40, 30, 80, 30, 15, 27, 13]
  }
  ]
};
class Chart extends Component {
    componentDidMount() {
        const { datasets } = this.refs.chart.chartInstance.data
        console.log(datasets[0].data);
    }

    render() {
        return (
            <Line ref="chart" data={data} />
        )
    }
}

export default Chart;
