module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
          barlow: ['barlow']
      },
      colors: {
        'header': '#1F2937',
        'primary-gray': "#E5E7EB",
        'red-primary': "#FF4655",
        
      },
      fontSize: {
        tiny: "0.65rem",
        none: "0rem"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}