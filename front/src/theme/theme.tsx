import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export type PaletteMode = "dark" | "light";

let theme = createTheme({
    palette: {
        mode: "dark" as PaletteMode,
        primary: {
            main: "#00d4ff",
        },
        secondary: {
            main: "#5e00ff",
        },
        error: {
            main: "#ff2b00",
        },
        warning: {
            main: "#ffc400",
        },
        info: {
            main: "#00d4ff",
        },
        success: {
            main: "#00ff0b",
        },
    },
    typography: {
        allVariants: {
            textTransform: "none",
            color: "#FFFFFF",
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 28,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#121212",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: "15px",
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    marginRight: "-25px",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 15,
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
