/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        custom: {
          border: "#35373B",
          primary: "#6241C2",
          default: "#37A9F0",
          sky: "#10FFED",
          lightgraythree: "#121212",
          lightgraytwo: "#232529",
          contentgray: "#38373C",
          lightgrayone: "#454950",
          graytwo: "#3A3B3C",
          gray: "#5B5B5B",
          darkgrayone: "#707070",
          darkgraytwo: "#92979F",
          darkgraythree: "#959BA3",
          darkgrayfour: "#DCDEE1",
          darkgrayfive: "#ADADAD",
          purple: "#D02BB6",
          yellow: "#FFF412",
          green: "#03E6AA",
          sub: "#a5a5a5",
          btn: "#D9D9D9",
          hash: "#959BA3"
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
