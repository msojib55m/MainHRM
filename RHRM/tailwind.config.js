/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}","./index.html",
  ],
  theme: {
    screens: {
      'xs':'50px',
      'sm': '610px',
      'md': '768px',
      'md1': '792px',
      'mdd1': '830px',
      'md2': '850px',
      'md3': '870px',
      'md4': '900px',
      'md5': '1000px',
      'lg': '1024px',
      'lg1': '1030px',
      'lg2': '1100px',
      'lg3': '1150px',
      'xl2': '1160px',
      'xl1': '1200px',
      'xl': '1280px',
      'xxll': '1300px',
      'xxl': '1350px',
      'xxl1': '1360px',
      'xxl2': '1600px',

    },
    extend: {},
  },
  plugins: [],
  variants:{
    extend:{
      display:['focus-group']
    }
  }
}

