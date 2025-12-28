import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../src/assets/styles.scss'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import Notifications from './component/Notification/index.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <Notifications />
    <App />
  </Provider>
  // </StrictMode>,
)
