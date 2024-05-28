/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundPosition: {
      'top-left': '0, 0',
      'x-axis': '-120% -120px',
      's-axis': '12.6rem',
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '77%': '77%',
      '16': '4rem',
      '110%': '110%',
    },
    fontFamily: {
      firma: ["firma"],
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
      '12xl': '12rem',
      '13xl': '3.125rem',  
      '14xl': '1.6rem',
      '15xl': '1.4rem',
      '16xl': '8rem',
      '17xl': '1.9rem',
      '18xl': '3.9rem',
      '19xl': '2rem',
      '21xl': '2.1rem',
      '24xl': '2.4rem',
      '30xl': '4.7rem',
      '31xl': '1.8rem',
      '32xl': '4.86rem',
      '34xl': '3.4rem',
      '35xl': '6.4rem',
      '36xl': '5.25rem',
      '38xl': '4.8rem',
      '39xl': '2.7rem',
      '40xl': '3.3rem',
      '41xl': '1.54rem',
      '42xl': '1.46rem',
    },
    letterSpacing: {
      supertight: '0.015em',
      verytight: '0.1rem',
      subtight: '0.18rem',
      tightest: '0.3rem',
      tighten: '0.25rem',
      tightened: '0.04em',
      tightener: '0.045em',
      extratight: '0.06em',
      moretight: '0.065em',
      moretighter: '0.09rem',
    },
    screens: {   
      'xs': '601px',       
      'sm': '769px',    
      'lg': '981px', 
      'xl': '1040px'
    },
    extend: {
      animation: {   
        dropdown: 'showDropdown 0.5s ease',     /** NAV MENU */
        lineDropdown: 'lineDropdown 0.5s linear',
        easeIn: 'easeIn 0.5s ease-out',               /** SECTION 1 ANIMATION */
        easeInComplete: '0.8s linear',
        easeInFast: 'easeInFast 3s ease',             /** SECTION 3 ANIMATION */
        easeOut: 'easeOut 1s linear',             /** SECTION 1 ANIMATION */
        slideRight: 'slideRight 0.5s ease',   /** SECTION 2 H5 ANIMATION */
        slideLeft: 'slideLeft 0.5s ease',     /** SECTION 2 H2 ANIMATION */
        fadeOut: 'fadeOut 21s linear infinite',   /** SECTION 4 CARDS SLIDE ANIMATION */  
        slideUp: 'slideUp 1.7s linear',     /** SECTION 2 GRAPH ANIMATION */
        slideUpFirst: 'slideUp 0.3s ease-in',     /** SECTION 7 DISCUSS ANIMATION */
        slideUpSecond: 'slideUp 0.6s ease-in',     /** SECTION 7 DISCUSS ANIMATION */
        slideUpSpan: 'slideUp 0.7s linear',     /** SECTION 2 H2 SPAN ANIMATION */
        slideDown: 'slideDown .6s ease-in-out',      /** STICKY HEADER **/
      },
      backgroundColor: {
        skin: {
          skyblue: 'var(--background-sky-blue)',
          transparentblue: 'var(--background-transparent-blue)',
          opaque: 'var(--color-opacity)',
        }
      },
      backgroundImage: {
        'dropdown-icon': "url('/src/assets/icons/dropdown.svg')",
        'return-invested': "url('/src/assets/images/return-pattern.svg')",
        'device-section': "url('/src/assets/images/home-device-section.svg')",
        'security-pattern': "url('/src/assets/images/security-section.svg')",
      },
      boxShadowColor: {
        skin: {
          hsla: 'var(--shadow-gray-opacity)',
          transparentblue: 'var(--background-transparent-blue)',
        }
      },
      colors: {
        'skin-gray': 'var(--color-lighter-gray)',
      },
      gridTemplateColumns: {
        '16': '1fr 1fr',
        '18': '54% 1fr',
        '20': '1fr',
        '22': 'repeat(auto-fit,minmax(240px,1fr))',
      },
      height: {
        '13': '3.2rem',
        '15': '3.6rem',
        '50': '3.125rem',
        '94': '20rem',
        '95.5': '22.5rem',
        '98': '25rem',
        '26.3': '26.3rem',
        '121': '30.875rem',
        '122': '45rem',
        '122.5': '46rem',
        '123': '34rem',
        '126': '40.625rem',
        '126.5': '46.5rem',
        '127': '48.7rem',
        '128': '58rem',
        '129': '60rem',
        '130': '65rem',       /** Section 1: Backdrop */
        '760': '126rem',
        '770': '76rem',
        '780': '78rem',
        '790': '79rem',
        '840': '84rem',
        '850': '85rem',
        '99.5': '0.1rem',
        '100': '0.2rem',      /** Hamburger::after Height */
        '114.5': '7.5rem',
        '126.4': '12.4rem',
        '128.6': '18.6rem',
      },
      inset: {
        '106': '0.6rem',
        '208': '1.7rem',
        '210': '1.8rem',
        '212': '2rem',
        '214': '9.5rem',
        '15': '3.75rem',
        '16.5': '3.85rem',
        '18': '4.5rem',  
        '19': '6.8rem',
        '21': '2.75rem',
        // '21.5': '2.85rem',
        '23': '5.2rem',         /** Section 2: card-item::after */

        '1/2': '1%',            /** UseCase: Section Two Cards Positioning */
        '8/2': '8%',            /** UseCase: Section Two Cards Positioning */
        '28/2': '28%',          /** UseCase: Section Two Cards Positioning */
        '32/2': '32%',          /** UseCase: Section Two Cards Positioning */
        '56/2': '56%',          /** UseCase: Section Two Cards Positioning */

        '58': '4rem',           /** UseCase: section-1 testimonial backdrop */
        '60': '6rem',           /** UseCase: section-1 testimonial backdrop, 4 */
        '80': '8rem',           /** UseCase: section-1 testimonial backdrop  */
        '15.9': '15rem',
      },
      keyframes: {
        easeIn: {    
          from: {
            transform: "translate3d(0px, 0.7294px, 0px) rotate(2deg) scale(1.0396, 1.03964)",
            opacity: 0.8,
            height: "95%",
          },
          to: {
            transform: "translateX(0)",
            opacity: 1,
            height: "100%",
          }
        },
        easeInFast: {    
          from: {
            transform: "translate3d(0px, 0.7294px, 0px) rotate(2deg) scale(1.0396, 1.03964)",
            opacity: 0.8,
          },
          to: {
            transform: "translateX(0)",
            opacity: 1,
          }
        },
        easeOut: {
          '0%': {
            opacity: 1,
          },
          to: {
            opacity: 0,
          }
        },
        fadeOut:  {
          '0%': { 
            transform: 'translateZ(0)' 
          },
          '100%': { 
            transform: 'translate3d(-100%, 0, 0)',
            opacity: 1,
          },
        },
        slideRight: {
          '0%': { 
            opacity: 0,
            transform: 'translate3d(-5%, 0, 0)',
          },
          to: { 
            opacity: 1,
            transform: 'translateZ(0)',
          },
        },
        slideLeft: {
          '0%': { 
            opacity: 0,
            transform: 'translate3d(5%, 0, 0)',
          },
          to: { 
            opacity: 1,
            transform: 'translateZ(0)',
          },
        },
        slideDown: {
          '0%': { 
            opacity: 0.5,
            transform: 'translate3d(0, -100%, 0)',
          },
          to: { 
            opacity: 1,
            transform: 'translateZ(0)',
          },
        },        /** Info Notes ontop Graph */
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
        },        /** Graph */
        showDropdown: {
          '0%': { 
            transform: 'translate3d(0px, -25.4804px, 0px) scale(0.8981, 0.898078)',
          },
          to: { 
            transform: 'translate(0px, 0px)',
          }, 
        },
        lineDropdown: {
          '0%': { 
            opacity: 0.7,
            transform: 'translate3d(0px, -25.4804px, 0px) scale(0.8981, 0.898078)',
          },
          to: { 
            opacity: 1,
            transform: 'translate(0px, 0px)',
          },
        }         /** Section Five */
      },
      lineHeight: {
        'to-tight': '1.1',
        'tighter': '1.35',
        'least': '0',
        'very-loose': '1.4',
        'more-loose': '1.55',
        'extra-loose': '2',
        'extra-loosened': '4.4rem',
      },
      margin: {
        '2.9': '0.4rem',
        '3.1': '0.6rem',
        '3.2': '0.8rem',
        '5.5': '1.125rem',
        '6.5': '1.85rem',
        '13.5': '2.1rem',
        '13.4': '2.4rem',
        '13.7': '2.7rem',
        '14.4': '4rem',
        '14.5': '3.125rem',
        '15.5': '3.35rem',
        '15.6': '3.7rem',
        '15.7': '3.9rem',
        '15.8': '4.3rem',
        '16.5': '5.71rem',
        '17.5': '5.3rem',
        '29': '0.5em',
        '95.5': '9.55em', 
      },
      maxWidth: {
        '99': '30rem',
        '100': '32rem',
        '101': '33rem',
        '126': '36.3rem',
        '2/4': '50%',
        '65/12': '65%',   /** UseCase: Section-3 (last p-tag) */
        '70/12': '70%',
        '80': '80%',
      },
      minHeight: {
        '97': '20rem',
        '98': '32rem',
        '104': '38rem',
        '106': '40rem',
        '116': '46rem',
        '125': '65rem',
        '138': '78rem',
      },
      minWidth: {
        '50': '3.125rem',
        '80': '17.8rem',
        '134': '33.4rem',
        // '63': '61%',
      },
      padding: {
        '5.4': '0.4rem',
        '6.4': '1.6rem',
        '6.5': '1.85rem',
        '13.5': '2.1rem',
        '14.4': '2.4rem',
        '14.5': '3.125rem',
        '14.7': '3.2rem',
        '15.5': '3.35rem',
        '15.8': '3.6rem',
        '18.5': '4.86rem',
      },
      textColor: {
        skin: {
          darkBlue: 'var(--color-dark-blue)',
          lightblue: 'var(--color-light-blue)',
          gray: 'var(--color-lighter-gray)',
          lightgray: 'var(--color-lightest-gray)',
          opaque: 'var(--color-opacity)',
        }
      },
      width: {
        '13': '3.2rem',
        '50': '3.125rem',
        '50.4': '12.4rem',
        '52.5': '14.5rem',
        '69': '9.625rem',
        '98': '25rem',
        '100': '30rem',
        '120': '43rem',
        '121': '45rem',
        '122': '33rem',
        '123': '34rem',
        '123.3': '36rem',
        '123.5': '44rem',
        '125': '40rem',
        '126': '40.625rem',
        '126.5': '46.5rem',       
        '127': '48.7rem',
        '127.5': '48.75rem',
        '135': '52rem',
        '135.3': '52.3rem',   // investment input width
        '136': '56rem',
        '140': '61.3rem',
        '182.3': '86.3rem',
        '183': '87.3rem',
        '630': '63rem',
        '720': '72rem',
        '780': '78rem',
      },
      zIndex: {
        '3': '3',
        '5': '5',
      }
    },
  },
  plugins: [],
}

