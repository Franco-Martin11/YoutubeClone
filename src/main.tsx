import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './styles/theme.ts'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
// import './index.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider resetCSS theme={theme}>
     {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
)
