import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";

let theme = createTheme({
  palette: {
    mode: 'light'
  }
})
theme = responsiveFontSizes(theme);

export default function MainTheme(props) {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}