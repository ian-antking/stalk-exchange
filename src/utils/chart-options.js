import colors from './colors';

const chartOptions = (baseline = null) => ({
  vAxis: {
    baseline,
    baselineColor: colors.error,
  },
  colors: [colors.primary, colors.secondary, colors.confirm],
  lineWidth: 3,
  backgroundColor: 'transparent',
  legend: { position: 'top', alignment: 'center' },
  chartArea: {
    width: '80%',
    height: '80%',
    marginTop: '10%',
  },
  curveType: 'function',
});

export default chartOptions;
