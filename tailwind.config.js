/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005a71",
        "primary-container": "#0e7490",
        "on-primary": "#ffffff",
        "primary-fixed": "#b9eaff",
        "primary-fixed-dim": "#81d1f0",
        "inverse-primary": "#81d1f0",
        
        secondary: "#505f76",
        "secondary-container": "#d0e1fb",
        "on-secondary-container": "#54647a",
        "secondary-fixed": "#d3e4fe",
        
        tertiary: "#794602",
        "tertiary-container": "#965e1c",
        "tertiary-fixed": "#ffdcbd",
        "tertiary-fixed-dim": "#ffb86f",
        
        surface: "#f7f9fb",
        "surface-bright": "#f7f9fb",
        "surface-dim": "#d8dadc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f4f6",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "surface-variant": "#e0e3e5",
        
        "on-surface": "#191c1e",
        "on-surface-variant": "#3f484c",
        outline: "#6f787d",
        "outline-variant": "#bec8cd",
        
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        
        background: "#f7f9fb",
        "inverse-surface": "#2d3133",
        "inverse-on-surface": "#eff1f3",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
        unit: "4px",
        gutter: "20px",
        "container-max": "1280px",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        "headline-lg": ["30px", { lineHeight: "40px", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-sm": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-md": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "label-sm": ["11px", { lineHeight: "14px", fontWeight: "600" }],
      },
      borderRadius: {
        DEFAULT: "4px",
        lg: "8px",
        xl: "12px",
      },
    },
  },
  plugins: [],
}
