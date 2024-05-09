/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dropdown-icon': "url('/src/assets/icons/dropdown.svg')",
        'return-invested': "url('/src/assets/images/return-pattern.svg')",
      },
      colors: {
        'dark-blue': 'var(--color-dark-blue)',
        'light-gray': 'var(--color-light-gray)',
      },
      fontFamily: {
        firma: [          
          '"CW BR Firma"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen-Sans',
          'Ubuntu',
          'Cantarell',
          '"Helvetica Neue"',
          'sans-serif',
        ]
      },
      height: {
        '50': '3.125rem',
        '98': '25rem',
        '123': '34rem',
        '124': '47rem',
        '125': '40rem',
        '126': '40.625rem',
        '126.5': '46.5rem',
        '127': '48.7rem',
        '128': '58rem',
        '780': '780px',
        '850': '850px'
      },
      inset: {
        '13.5': '4.25rem',
        '15': '3.75rem',
        '18': '4.5rem',  

        '1/2': '1%', 
        '8/2': '8%',
        '28/2': '28%',
        '32/2': '32%',
        '56/2': '56%',

        '100': '100px',
      },
      lineHeight: {
        'to-tight': '1.1',
        'tighter': '1.35',
        // 'extra-loose': '2.5',
        // '12': '3rem',
      },
      margin: {
        '5.5': '1.125rem',
        '6.5': '1.85rem',
        '13.5': '2.1rem',
        '14.5': '3.125rem',
        '15.5': '3.35rem',
        '16.5': '5.71rem',
      },
      maxWidth: {
        '80': '80%',
      },
      minHeight: {
        '126': '650px',
      },
      minWidth: {
        '50': '3.125rem',
        '63': '61%',
      },
      padding: {
        '6.5': '1.85rem',
        '13.5': '2.1rem',
        '14.5': '3.125rem',
        '15.5': '3.35rem',
        '18.5': '4.86rem',
      },
      width: {
        '78': '20.75rem',
        '50': '3.125rem',
        '98': '25rem',
        '122': '33rem',
        '123': '34rem',
        '123.5': '44rem',
        '124': '47rem',
        '125': '40rem',
        '126': '40.625rem',
        '126.5': '46.5rem',
        '127': '48.7rem',
        '127.5': '48.75rem',
        '128': '58rem',
        '630': '630px',
        '720': '720px'
      },
      zIndex: {
        '3': '3',
        '5': '5',
      }
    },
  },
  plugins: [],
}

