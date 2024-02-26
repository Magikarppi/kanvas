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
                    fontSize: 15,
                    marginTop: 15,
                    marginBottom: 15,
                    minWidth: "200px",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    paddingLeft: 10,
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
                    marginTop: 4,
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: 12,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& input": { fontSize: 14 },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    marginBottom: 1,
                    marginTop: 16,
                    marginLeft: 6,
                    marginRight: 6,
                    fontWeight: "bold",
                    color: "#00d4ff",
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    cursor: "pointer",
                    fontSize: 13,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    height: "100px",
                    pl: "10px",
                    pr: "10px",
                    border: "1px solid #ffff",
                    transition: "0.6s",
                    "&:hover": {
                        backgroundColor: "secondary.main",
                    },
                    cursor: "pointer",
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                noOptions: {
                    fontSize: "14px",
                    color: "white",
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
