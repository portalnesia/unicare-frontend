import type { AppProps } from 'next/app'
import { AppProvider } from '@/themes'
import { Provider as ReduxWrapper } from 'react-redux';
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from '@/themes/cache';
import { wrapperRoot } from '@/redux/store';
import { SnackbarProvider } from 'notistack';

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, ...rest }: AppProps & { emotionCache?: EmotionCache }) {
    const { store, props } = wrapperRoot.useWrappedStore(rest);
    return (
        <CacheProvider value={emotionCache}>
            <ReduxWrapper store={store}>
                <AppProvider locale={props?.router?.locale}>
                    <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} maxSnack={4}>
                        <Component {...props.pageProps} />
                    </SnackbarProvider>
                </AppProvider>
            </ReduxWrapper>
        </CacheProvider>
    )
}

export default App;