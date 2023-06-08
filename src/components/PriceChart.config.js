export const lineChartOptions = {
  responsive: true,
  indexAxis: 'x',
  tension: 0.01,
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxTicksLimit: 15,
      },
    },
    y: {
      grid: {
        display: true,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      align: 'end',
      labels: {
        pointStyleWidth: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 2,
      },
    },
    title: {
      display: true,
    },
  },
  maintainAspectRatio: false,
}


export const verticalChartOptions = {
  responsive: true,
  indexAxis: 'x',
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxTicksLimit: 15,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      align: 'end',
      labels: {
        pointStyleWidth: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 2,
      },
    },
    title: {
      display: true,
    },
  },
  maintainAspectRatio: false,
  };

export const horizontalChartOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
    // ticks: {
    //   maxTicksLimit: 3,
    // },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      align: 'end',
      labels: {
        pointStyleWidth: 15,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 2,
      },
    },
    title: {
      display: true,
    },
  },
  maintainAspectRatio: false,
  };