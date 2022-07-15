import '../styles/globals.css'

import type { AppProps } from 'next/app'
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import Router from 'next/router';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import App from 'next/app'
import ErrorProvider from '../providers/AlertProvider'
import '../styles/bootstrap.scss'
import { SSRProvider } from 'react-bootstrap';

config.autoAddCss = false

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider >
      <ErrorProvider>
        <Component {...pageProps} />
      </ErrorProvider>
    </SSRProvider>
  )
}

// Need entire app to be SSR due to the nature of docker setup
// with runtime configurations that change with the environment.
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default MyApp
