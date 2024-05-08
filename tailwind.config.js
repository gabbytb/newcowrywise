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
      },
      colors: {
        // 'light-pink': 'var(--color-light-pink)',
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
        '98': '25rem',
        '124': '32.5rem',
        '126': '40.625rem',
        '128': '53.125rem',
      },
      inset: {
        '15': '3.75rem',
      },
      margin: {
        '7.5': '1.875rem',
        '14.5': '3.125rem',
      },
      padding: {
        '7.5': '1.875rem',
        '14.5': '3.125rem',
      },
      width: {
        '98': '25rem',
        '124': '32.5rem',
        '125': '36.5rem',
        '126': '40.625rem',
        '128': '53.125rem',
      },
      zIndex: {
        '3': '3',
        '5': '5',
      }
    },
  },
  plugins: [],
}

