var tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
  variants: {
    display: ["responsive"],
    justifyContent: ["responsive"]
  }
};
