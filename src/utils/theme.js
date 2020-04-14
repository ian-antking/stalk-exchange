const theme = {
  colors: {
    text: '#39383d',
    primary: '#71b6f7',
    secondary: '#ee6668',
    background: '#b1f5fb',
    confirm: '#ea4d740',
    error: '#c93335',
    muted: '#f5f7e9',
    white: '#fff',
    gray: '#b7b398',
    highlight: '#ffbb5f',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64, 96
  ],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    avatar: 48,
  },
  radii: {
    default: 10,
    circle: 99999,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
  },
  // rebass variants
  input: {
    backgroundColor: 'white',
  },
  text: {
    heading: {
      color: 'text',
      mb: 3,
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [ 5, 6, 7 ],
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  variants: {
    avatar: {
      width: 'avatar',
      height: 'avatar',
      borderRadius: 'circle',
    },
    card: {
      p: 3,
      marginTop: 3,
      mx: 'auto',
      width: '80%',
      bg: 'muted',
      borderRadius: 'default'
    },
    navbar: {
      backgroundColor: 'primary',
      color: 'muted',
      py: 3,
      px: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    link: {
      color: 'primary',
    },
    nav: {
      fontSize: 1,
      fontWeight: 'bold',
      display: 'inline-block',
      p: 2,
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus,.active': {
        color: 'highlight',
      }
    },
  },
  buttons: {
    primary: {
      my: 3,
      fontSize: 2,
      fontWeight: 'bold',
      color: 'muted',
      bg: 'primary',
      borderRadius: 'default',
    },
    outline: {
      variant: 'buttons.primary',
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 2px',
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
  },
}

export default theme