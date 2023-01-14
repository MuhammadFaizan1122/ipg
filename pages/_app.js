import '../styles/globals.css'
import Layout from './Layout/Layout'
import { ThemeProvider } from 'next-themes'


function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider themes={'class'}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
