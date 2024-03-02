import React from 'react'
import { CssBaseline, ThemeOptions, StyledEngineProvider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { enUS, idID } from '@mui/material/locale'
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import GlobalStyles from './global';
import breakpoints from './breakpoints';

export interface AppProviderProps {
    children: React.ReactNode
    locale?: 'id' | 'en'
}
const inputGlobalStyles = <GlobalStyles />

export function AppProvider({ children, locale }: AppProviderProps) {
    const themeOptions = React.useMemo<ThemeOptions>(
        () => ({
            palette: palette,
            shape: { borderRadius: 8 },
            typography,
            breakpoints,
            zIndex: {
                snackbar: 2000
            }
        }),
        []
    );

    const themes = React.useMemo(() => {
        const language = locale === 'en' ? enUS : idID
        const theme = createTheme(themeOptions, language)
        theme.components = componentsOverride(theme)
        return theme;
    }, [themeOptions, locale]);

    return (
        <ThemeProvider theme={themes}>
            <CssBaseline />
            {inputGlobalStyles}
            {children}
        </ThemeProvider>
    )
}

export { GlobalStyles }