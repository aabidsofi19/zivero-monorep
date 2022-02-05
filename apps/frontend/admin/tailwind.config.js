module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [require('@tailwindcss/forms')],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        forest: '#11201e',
        tealDark: '#154042',
        mint: '#d5e9dd',
        pink: '#decec8',
        cloud: '#d4d6d5',
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
