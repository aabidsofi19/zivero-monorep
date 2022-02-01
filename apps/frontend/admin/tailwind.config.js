module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [require('@tailwindcss/forms')],

  theme: {
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
