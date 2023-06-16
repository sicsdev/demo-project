export const OverTimeChartData = {
    type: 'line',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Tickets',
                data: [1, 2, 2.5, 1.5, 2.5, 2.8],
                borderColor: '#FF1654',
                backgroundColor: 'rgba(255, 22, 84, 0.5)',
                fill: 'origin',
            },
            {
                label: 'Interactions',
                data: [20, 29, 37, 36, 44, 35],
                borderColor: '#247BA0',
                backgroundColor: 'rgba(36, 123, 160, 0.5)',
                fill: 'origin',
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    borderColor: '#8c8c8c',
                    borderDash: [1],
                    drawBorder: false,
                },
            },
            y: [
                {
                    id: 'tickets-axis',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        fontColor: '#FF1654',
                    },
                    grid: {
                        borderColor: '#8c8c8c',
                        borderDash: [1],
                        drawBorder: false,
                    },
                    title: {
                        display: true,
                        text: 'Tickets',
                        fontColor: '#FF1654',
                    },
                },
                {
                    id: 'interactions-axis',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        fontColor: '#247BA0',
                    },
                    grid: {
                        borderColor: '#8c8c8c',
                        borderDash: [1],
                        drawBorder: false,
                    },
                    title: {
                        display: true,
                        text: 'Interactions',
                        fontColor: '#247BA0',
                    },
                },
            ],
        },
        plugins: {
            legend: {
                align: 'center',
                labels: {
                    usePointStyle: true,
                },
            },
        },
    },
}



export const SpikesChartData = {
    type: 'line',
    data: {
        labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6', 'Week7', 'Week8'],
        datasets: [
            {
                label: 'Ticket Quantity',
                data: [1, 2, 2.5, 1.5, 2.5, 2.8, 5, 1],
                borderColor: '#FF1654',
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                grid: {
                    borderColor: '#8c8c8c',
                    borderDash: [1],
                    drawBorder: false,
                },
            },
            y: [
                {
                    id: 'tickets-axis',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        fontColor: '#FF1654',
                    },
                    grid: {
                        borderColor: '#8c8c8c',
                        borderDash: [1],
                        drawBorder: false,
                    },
                    title: {
                        display: true,
                        text: 'Tickets',
                        fontColor: '#FF1654',
                    },
                },
            ],
        },
        plugins: {
            legend: {
                align: 'center',
                labels: {
                    usePointStyle: true,
                },
            },
        },
    },
}