module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
     
      fontFamily: {
        sant: [],
      },
      colors: {
        "identity-primary": "#dc0a2d",
        "grayscale-dark": "#212121",
        "grayscale-medium": "#666666",
        "grayscale-light": "#e0e0e0",
        "grayscale-background": "#efefef",
        "grayscale-white": "#ffffff",
        // Tambahkan warna Pokémon di sini
        pokemon: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        },
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        tiny: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
        "6xl": "64px",
        "7xl": "80px",
        // Custom sizes
        "custom-small": "10px",
        "custom-medium": "22px",
        "custom-large": "40px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      fontWeight: {
        regular: 400,
        bold: 700,
      },
      boxShadow: {
        drop: "0px 1px 3px 1px rgba(0, 0, 0, 0.2)",
        "drop-hover": "0px 3px 12px 3px rgba(0, 0, 0, 0.2)",
        "drop-inner": "0px 1px 3px 1px rgba(0, 0, 0, 0.25) inset",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
