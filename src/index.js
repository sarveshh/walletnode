import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './context/context'
import { SpeechProvider } from '@speechly/react-client'
import { AuthProvider } from './context/AuthContext'
import * as serviceWorker from "./serviceWorker";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Themes from "./themes";
import { LayoutProvider } from "./context/LayoutContext";

ReactDOM.render(
  <LayoutProvider>
    <SpeechProvider appId="3a9de8b2-c3bd-4e44-ba3c-1055865e6908" language="en-US">
      <BrowserRouter>
        <Provider>
          <AuthProvider>
            <ThemeProvider theme={Themes.default}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </SpeechProvider>,
  </LayoutProvider>,


  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();