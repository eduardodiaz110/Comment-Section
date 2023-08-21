import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export enum themePalette {
  BG = "#fafafa",
  CYAN = "rgba(0, 0, 0, 0.6)",
  DVIOLET = "hsl(257, 27%, 26%)",
  RED = "hsl(0, 87%, 67%)",
  GRAY = "hsl(0, 0%, 75%)",
  GRAYTRANQUI = "#f0f1f6",
  GRAYVIO = "hsl(257, 7%, 63%)",
  DBLUE = "hsl(255, 11%, 22%)",
  FONT_GLOBAL = "poppins.style.fontFamily",
}

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f6f6f6",
    },
    primary: {
      main: themePalette.CYAN,
    },
    secondary: {
      main: themePalette.BG,
    },
  },

  typography: {
    fontFamily: poppins.style.fontFamily,
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            backgroundColor: "#5358b3",
            color: "#fff",
            borderRadius: "5px",
            textTransform: "none",
          },
        },
        {
          props: { variant: "text" },
          style: {
            color: themePalette.GRAYVIO,
            fontWeight: "700",
            textTransform: "none",
            fontSize: "15px",
          },
        },
        {
          props: { className: "botongrande" },
          style: {
            backgroundColor: `${themePalette.CYAN}`,
            color: "white",
            borderRadius: "25px",
            padding: "10px 40px",
            textTransform: "none",
            fontSize: "17px",
            letterSpacing: "0.3px",
            "&:hover": {
              backgroundColor: `${themePalette.CYAN}`,
            },
          },
        },
      ],
    },

    MuiTypography: {
      variants: [
        {
          props: { variant: "h1" },
          style: {
            fontSize: "60px",
            fontWeight: "700",
            lineHeight: "1.1em",
            letterSpacing: "0px",
            "@media (max-width:600px)": {
              fontSize: "50px",
            },
          },
        },
        {
          props: { variant: "subtitle1" },
          style: {
            color: themePalette.GRAYVIO,
            fontWeight: "500",
            fontSize: "22px",
            lineHeight: "1.5em",
            "@media (max-width:600px)": {
              fontSize: "18px",
            },
          },
        },
        {
          props: { variant: "h2" },
          style: {
            fontSize: "40px",
            fontWeight: "700",
            lineHeight: "1.1em",
            letterSpacing: "0px",
            "@media (max-width:600px)": {
              fontSize: "30px",
            },
          },
        },
        {
          props: { variant: "h3" },
          style: {
            fontSize: "2px",
            fontWeight: "700",
            lineHeight: "1.1em",
            letterSpacing: "0px",
            "@media (max-width:600px)": {
              fontSize: "30px",
            },
          },
        },
        {
          props: { variant: "h4" },
          style: {
            fontSize: "22px",
            fontWeight: "700",
            lineHeight: "1.1em",
            letterSpacing: "0px",
            "@media (max-width:600px)": {
              fontSize: "18px",
            },
          },
        },
        {
          props: { variant: "h6" },
          style: {
            fontSize: "20px",
            fontWeight: "500",
            lineHeight: "1.1em",
            letterSpacing: "0px",
            "@media (max-width:600px)": {
              fontSize: "23px",
            },
          },
        },
        {
          props: { variant: "subtitle2" },
          style: {
            color: themePalette.GRAYVIO,
            fontWeight: "500",
            fontSize: "19px",
            lineHeight: "1.5em",
            "@media (max-width:600px)": {
              fontSize: "18px",
            },
          },
        },
        {
          props: { variant: "body1" },
          style: {
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5em",
            letterSpacing: "0px",
            "@media (max-width:600px)": {
              fontSize: "19px",
            },
          },
        },
        {
          props: { variant: "body2" },
          style: {
            fontSize: "15px",
            color: themePalette.GRAYVIO,
            fontWeight: "500",
            lineHeight: "1.5em",
            letterSpacing: "0px",
            "@media (max-width:600px)": {
              fontSize: "19px",
            },
          },
        },
      ],
    },
  },
});

// type ThemeProp = {
//   children: JSX.Element;
// };

// export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {children}
//     </ThemeProvider>
//   );
// };
