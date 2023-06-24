import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './store/store'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './pages/App.tsx'
import LogScreen from './pages/LogScreen.tsx'
import RegScreen from './pages/RegScreen.tsx'

import './index.css'
import 'semantic-ui-css/semantic.min.css'

const routes = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "login", element: <LogScreen />},
  {path: "register", element: <RegScreen />},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
