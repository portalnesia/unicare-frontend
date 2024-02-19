import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "@/themes/cache";
import { AppType } from "next/app";
import { EmotionCache } from "@emotion/react";
import { JSX } from "react";

class MyDocument extends Document<{ emotionStyleTags: JSX.Element[] }> {
	render(): JSX.Element {
		return (
			<Html>
				<Head>
					<meta key="meta-2" httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
					<link
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
						rel="stylesheet"
					/>
					<link rel="apple-touch-icon" sizes="180x180" href="/logo/apple-touch-icon.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/logo/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/logo/favicon-16x16.png" />
					{/*<link rel="mask-icon" href="/logo/safari-pinned-tab.svg" color="#328AE2" />*/}
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="theme-color" content="#328AE2" />
					{this.props.emotionStyleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const originalRenderPage = ctx.renderPage;

	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType> & { emotionCache?: EmotionCache }>) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				},
		});

	const initialProps = await Document.getInitialProps(ctx);
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(" ")}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));
	return {
		...initialProps,
		emotionStyleTags,
	};
};

export default MyDocument;
