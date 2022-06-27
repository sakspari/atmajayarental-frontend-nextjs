import '../styles/globals.css'

// import App from "next/app";
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper"
import store, {persistedStore} from "../util/store";
import {PersistGate} from "redux-persist/integration/react";


function MyApp({Component, pageProps}) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistedStore}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    )
}

export default MyApp
