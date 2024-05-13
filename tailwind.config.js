/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/*.html",
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
      '10xl': '1.3rem',
      '12xl': '120px',
      '13xl': '3.125rem',  
      '14xl': '1.6rem',
    },
    letterSpacing: {
      tightest: '3px',
      tighten: '0.25rem',
      tightened: '0.04em',
      tightener: '0.045em',
    },
    extend: {
<<<<<<< HEAD
      animation: {   
        easeIn: 'easeIn 4s ease',   /** SECTION 1 ANIMATION */
        slideRight: 'slideRight 0.5s ease',   /** SECTION 1 ANIMATION */
        fade: 'fade 40s linear infinite',   /** SECTION 4 SLIDER ANIMATION */  
        slideUp: 'slideUp 2.5s linear',     /** SECTION 2 GRAPH ANIMATION */
        slideUpSpan: 'slideUp 0.6s linear',     /** SECTION 2 GRAPH ANIMATION */
        slideDown: 'slideDown .42s ease-in-out',      /** STICKY HEADER **/
=======
      animation: {    
        fade: 'fade 40s linear infinite',    
        clipPathAnimation: 'clipPathAnimation 2.5s linear',     /** SECTION 2 GRAPH ANIMATION */
        slideDown: 'slideDown .42s ease-in-out',      /** STICKY HEADER ANIMATION **/
>>>>>>> 21a1eae6909ee66c989b024956287499d9003051
      },
      backgroundImage: {
        'dropdown-icon': "url('/src/assets/icons/dropdown.svg')",
        'return-invested': "url('/src/assets/images/return-pattern.svg')",
      },
      colors: {
        'dark-blue': 'var(--color-dark-blue)',
        'light-gray': 'var(--color-light-gray)',
        'sky-blue': 'var(--color-sky-blue)',
        'light-gray': 'var(--color-gray-opacity)',
      },
      height: {
        '50': '3.125rem',
        '94': '20rem',
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

        '60': "60px",           // UseCase: section-1, 4,
        '80': '80px',           // UseCase: section-1
        '100': '100px',
      },
      keyframes: {
<<<<<<< HEAD
        easeIn: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          }
        },
=======
>>>>>>> 21a1eae6909ee66c989b024956287499d9003051
        fade:  {
          '0%': { 
            transform: 'translateZ(0)' 
          },
          '100%': { 
            transform: 'translate3d(-100%, 0, 0)' 
          },
        },
<<<<<<< HEAD
        slideRight: {
          '0%': { 
            transform: 'translate3d(-100%, 0%, 0)',
          },
          to: { 
            transform: 'translateZ(0)',
          },
        },
=======
>>>>>>> 21a1eae6909ee66c989b024956287499d9003051
        slideDown: {
          '0%': { 
            transform: 'translate3d(0, -100%, 0)',
          },
          to: { 
            transform: 'translateZ(0)',
          },
        },
        slideUp: { 
          '0%': {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          },       
          '50%': {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 50%, 0% 50%)',
          },
          '100%': {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
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
        '99': '30rem',
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
        '69': '9.625rem',
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
        '720': '720px',
        '22/12': '120%',

      },
      zIndex: {
        '3': '3',
        '5': '5',
      }
    },
  },
  plugins: [],
}

