/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sfProLight: ["SfProLight", "sans-serif"],
        sfProItalic: ["SfProItalic", "sans-serif"],
        sfProSemiBold: ["SfProSemiBold", "sans-serif"],
        sfProBold: ["SfProBold", "sens-serif"],
        sfProRegular: ["SfProRegular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
