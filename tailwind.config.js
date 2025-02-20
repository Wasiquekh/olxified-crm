/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkMaroon: "#A3000E",
        darkestMaroon: "#700000",
        lightMaroon: "#FFCCD0",
        lighterMaroon: "#FFE8EA",
        customBlue: "#09549D",
        firstBlack: "#171717",
        secondBlack: "#0A0A0A",
        tableBorder: "#F1F1F1",
        customBorder: "#F5F6F7",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        cardBg: "linear-gradient(107deg, #2D60FF 2.61%, #539BFF 101.2%)",
        card: "linear-gradient(107deg, #4C49ED 2.61%, #0A06F4 101.2%)",
        cardFooter:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.00) 100%)",
          'header-gradient': "linear-gradient(206deg, #A3000E 28.85%, rgba(245, 247, 248, 0.00) 89.55%)",
      },
      boxShadow: {
        loginBoxShadow: "1px 3px 3px 0px rgba(0, 0, 0, 0.25)",
        borderShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.25)",
        lastTransaction: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
        lastTransactionList: "0px 0px 1px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".placeholder-font-weight-100::placeholder": {
            fontWeight: "100",
          },
          ".placeholder-font-weight-200::placeholder": {
            fontWeight: "200",
          },
          ".placeholder-font-weight-300::placeholder": {
            fontWeight: "300",
          },
          ".placeholder-font-weight-400::placeholder": {
            fontWeight: "400",
          },
          ".placeholder-font-weight-500::placeholder": {
            fontWeight: "500",
          },
          ".placeholder-font-weight-600::placeholder": {
            fontWeight: "600",
          },
          ".placeholder-font-weight-700::placeholder": {
            fontWeight: "700",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
