/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    backgroundPosition: {
      'top-left': '0, 0',
    },
    fontFamily: {
      firma: ["CW BR Firma"],
    },
    fontSize: {
      'xs': '.75rem',     // Extra Small
      'sm': '.875rem',    // Small
      'base': '1rem',     // Base
      'lg': '1.125rem',   // Large
      'xl': '1.25rem',    // Extra Large
      '2xl': '1.5rem',    // 2 Extra Large
      '3xl': '1.875rem',  // 3 Extra Large
      '4xl': '2.25rem',   // 4 Extra Large
      '5xl': '3rem',      // 5 Extra Large
      '6xl': '4rem',      // 6 Extra Large
      '7xl': '5rem',      // 7 Extra Large
      '8xl': '6rem',
      '9xl': '7rem',
      '10xl': '1.45rem',
      '12xl': '120px',
    
    },
    letterSpacing: {
      tightened: '0.04em',
      tightener: '0.045em',
    },
    extend: {
      animation: {
        slideDown: 'slideDown .42s cubic-bezier(.165,.84,.44,1)',
        slideIn: 'slideIn .42s cubic-bezier(.165,.84,.44,1)',
        slideUp: 'all 1s ease',
      },
      backgroundImage: {
        'dropdown-icon': "url('/src/assets/icons/dropdown.svg')",
        'return-invested': "url('/src/assets/images/return-pattern.svg')",
      },
      colors: {
        'dark-blue': 'var(--color-dark-blue)',
        'light-gray': 'var(--color-light-gray)',
        'sky-blue': 'var(--color-sky-blue)',
      },
      height: {
        '50': '3.125rem',
        '98': '25rem',
        '121': '30.875rem',
        '123': '34rem',
        '124': '47rem',
        '125': '40rem',
        '126': '40.625rem',
        '126.5': '46.5rem',
        '127': '48.7rem',
        '128': '58rem',
        '780': '780px',
        '840': '840px',
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
      keyframes: {
        slideDown: {
          '0%': { 
            transform: 'translate3d(0, -80px, 0)',
          },
          to: { 
            transform: 'translateZ(0)',
          },
        },
        slideIn: {
          '0%, 50%': { 
            // transform: 'translate3d(-1000px, 0, 0)',
          },
          '100%': { 
            transform: 'translateX(0)',
          },
        },
      },
      lineHeight: {
        'to-tight': '1.1',
        'tighter': '1.35',
        'least': '0',
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
        '29': '5px',
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
        '120': '43rem',
        '121': '45rem',
        '122': '33rem',
        '123': '34rem',
        '123.5': '44rem',
        '124': '47rem',
        '125': '40rem',
        '126': '40.625rem',
        '126.5': '46.5rem',
        '127': '48.7rem',
        '127.5': '48.75rem',
        '127.7': '50rem',
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

