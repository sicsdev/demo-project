import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register({
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
});
const hoverShadowPlugin = {
  id: 'hoverShadow',
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const activeElements = chart.getActiveElements();

    if (activeElements.length > 0) {
      const activeElement = activeElements[0];
      const datasetIndex = activeElement.datasetIndex;
      const elementIndex = activeElement.index;
      const datasetMeta = chart.getDatasetMeta(datasetIndex);
      const element = datasetMeta.data[elementIndex];

      // Save the current state
      ctx.save();
      ctx.stroke();
      // Apply shadow to the entire canvas context
      ctx.shadowColor = 'rgb(0, 108, 255)';
      ctx.shadowBlur = 10;
      // Redraw the active point with the shadow
      element.draw(ctx);

      // Clear the shadow so it doesn't affect other canvas elements
      ctx.shadowColor = 'green';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;

      // Restore the original state
      ctx.restore();
    }
  },
};


// You need to register this plugin with Chart.js
ChartJS.register(hoverShadowPlugin);
const LineChart = ({ chartData }) => {
const labels = chartData.map(ele => moment(ele.date, 'DD/MM/YYYY').format('DD MMM YY'));
  )
  const dataPoints = chartData.map(ele => ele.usage) // Example data points
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: '#FFFFFF', // Set the tooltip background color to white
        titleFont: { size: 13 },    // Customize the font size of the title
        bodyFont: { size: 13 },     // Customize the font size of the body
        titleColor: '#000000',      // Set the title text color to black
        bodyColor: '#000000',       // Set the body text color to black
        borderColor: '#e0e0e0',     // Set the border color of the tooltip to a light grey
        borderWidth: 1,             // Set the border width of the tooltip
        displayColors: false,       // Do not display the color box next to the text
        bodySpacing: 4,             // Set spacing between lines in the body
        usePointStyle: true,        // Use point style for the color boxes (if you set displayColors to true)
        xPadding: 10,               // Set x-padding for the tooltip
        yPadding: 10,               // Set y-padding for the tooltip
        cornerRadius: 5,            // Set corner radius for the tooltip
        // Customize the tooltip
        callbacks: {
          title: function () {
            return ''; // Return an empty string to not display a title
          },
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const date = context.label;
            return `${value} ${label} on ${date}`; // Format the label text
          },
          labelTextColor: function () {
            return '#000000'; // Set the text color for the labels
          }
        }
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
        grid: {
          drawBorder: false, // Do not draw the border line
        },
      },
    },
    elements: {
      point: {
        radius: 5, // Normal state radius
        borderWidth: 2, // Normal state border width
        borderColor: 'white', // Normal state border color
        backgroundColor: '#2563EB', // Normal state background color
        hoverRadius: 10, // Hover state radius - make this larger for a pronounced ring
        hoverBorderWidth: 6, // Hover state border width - increase this for a thicker ring
        hoverBorderColor: 'rgba(255, 255, 255, 0.6)', // Hover state border color - set to a semi-transparent white for the ring effect
      },
      line: {
        borderWidth: 2,
        tension: 0.4,
      }
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
    maintainAspectRatio: false,
    layout: {
      padding: { // Add padding so that the line starts and ends at the edge
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  function getGradient(ctx, chartArea) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(1, "rgba(222,236,249, .4)");
    gradient.addColorStop(0, "#fff");
    return gradient;
  }

  const data = {
    labels: labels,
    datasets: [{
      label: 'chats',
      data: dataPoints,
      // data: [0, 2, 5, 0, 0, 5, 0],
      fill: true,
      // backgroundColor: 'rgb(222,236,249, 0.3)',
      backgroundColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        // This case happens on initial chart load
        if (!chartArea) return;
        return getGradient(ctx, chartArea);
      },
      borderColor: '#2563EB', // Color of the line
      tension: 0.4, // Smoothness of the line
      borderWidth: 3, // Width of the line
      pointBackgroundColor: '#2563EB', // Color inside the points
      pointBorderColor: 'white', // Border color of the points
      hoverRadius: 7, // Set this smaller than before if needed
      hoverBorderWidth: 2, // Set this smaller than before if needed// Radius of the points
      pointHoverRadius: 7, // Radius of the points when hovered
      pointHoverBorderColor: '#ffffff'
    }]
  };

  return (
    <div className="px-4">
      <Line
        data={data}
        options={options}
      /></div>
  );
}

export default LineChart;
