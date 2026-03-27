import { createTheme, alpha, PaletteColorOptions, PaletteColor } from '@mui/material/styles';

// Augment the MUI Palette to include custom searchBar tokens
declare module '@mui/material/styles' {
    interface Palette {
        searchBar: {
            bg: string;
            bgHover: string;
        };
        dark: PaletteColor;
        hover: PaletteColor;
        bg: PaletteColor;
        fontColor: PaletteColor;
    }
    interface PaletteOptions {
        searchBar?: {
            bg?: string;
            bgHover?: string;
        };

        dark?: PaletteColorOptions
        hover?: {
            cta: string;
            main: string;
            dark: string;
            contrastText: string;
            navlink: string,
            signup: string


        }
        bg?: {
            white: string;
            light: string;
            dark: string;
            contrastText: string;
            signup: string
            product: string,
        }
        fontColor?: {
            white: string,
            footer: string,
            header: string,
            body: string,
            itemDisplay: string,
            itemTextV1: string,
            itemTextV2: string,
            navlink: string
        }

    }


}

const theme = createTheme({
    shape: {
        borderRadius: 10,
    },
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#1111d4',
            contrastText: '#fff',
        },
        hover: {
            cta: '#0d0db0',
            main: '#0d0db0',
            dark: '#0d0db0',
            contrastText: '#fff',
            navlink: '#c62828',
            signup: "#d05a16"


        },

        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        warning: {
            light: 'red',
            main: '#e53935',
            dark: '#111',
        },
        searchBar: {
            bg: alpha('#000000', 0.07),
            bgHover: alpha('#000000', 0.12),
        },
        bg: {
            light: "#f2f2f2ff",
            white: "#fff",
            dark: "#f2f2f2ff",
            product: "#f5f5f5",
            contrastText: "#000",
            signup: "#E8651C"
        },
        fontColor: {
            white: "#fff",
            footer: "#616060ff",
            header: "#000",
            body: "#000",
            itemDisplay: "#f5a623",
            itemTextV1: "#666",
            itemTextV2: "#888",
            navlink: "#e53935",


        }
    },
    components: {
        MuiInputBase: {
            styleOverrides: {
                root: ({ theme }) => ({
                    // Scoped to .search-input class so it doesn't affect other InputBase usages
                    '&.search-input': {
                        color: theme.palette.text.primary,
                        '& .MuiInputBase-input': {
                            padding: theme.spacing(1, 1, 1, 0),

                            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                            transition: theme.transitions.create('width'),
                            width: '100%',
                            [theme.breakpoints.up('md')]: {
                                width: '20ch',
                            },
                        },
                    },
                }),
            },
        },
    },
});

export default theme;
