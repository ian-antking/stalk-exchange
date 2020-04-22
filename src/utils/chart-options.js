import colors from './colors';

const chartOptions = (baseline = null) => ({
    vAxis: {
      baseline,
      baselineColor: colors.error,
      baselineWidth: 5,
      viewWindow: {
        min: 0,
        max: 600,
      },
    },
    colors: [colors.primary, colors.secondary, colors.confirm],
    lineWidth: 5,
    backgroundColor: 'transparent',
    legend: { position: 'top' },
    chartArea: {
      width: '80%',
      height: '80%',
      marginTop: '10%',
    },
  }
)

export default chartOptions;
