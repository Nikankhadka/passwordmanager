import '../styles/globals.css'
import "../styles/login.css"
import "../styles/user.css"


//dont get red of this every page default compaonnet when exported is passed and rendered through here
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
