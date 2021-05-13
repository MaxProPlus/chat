import React from 'react'
import {Router} from 'react-router-dom'
import Routes from 'routes/Routes'
import {CssBaseline, StylesProvider, ThemeProvider} from '@material-ui/core'
import theme from 'themes/theme'
import {history} from 'routes/history'

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </StylesProvider>
  )
}

export default App
