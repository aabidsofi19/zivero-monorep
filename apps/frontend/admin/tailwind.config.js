module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],

  theme: {
    // screens: {
    //   sm: { min: '639px' },

    //   md: { max: '767px' },

    //   lg: { max: '1023px' },

    //   xl: { max: '1279px' },
    // },
    extend: {
      colors: {
        primary: '#DEB992',
        secondary: '#e98074',
        accent: '#1BA098',
        error: '#b71c1c',
        info: '#D8c3a5',
        background: '#051622',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
