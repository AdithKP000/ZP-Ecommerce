import { createTheme, alpha } from '@mui/material/styles';

// Augment the MUI Palette to include custom searchBar tokens
declare module '@mui/material/styles' {
    interface Palette {
        searchBar: {
            bg: string;
            bgHover: string;
        };
    }
    interface PaletteOptions {
        searchBar?: {
            bg?: string;
            bgHover?: string;
        };
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
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        searchBar: {
            bg: alpha('#000000', 0.07),
            bgHover: alpha('#000000', 0.12),
        },
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
