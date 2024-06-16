"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { Header } from "../components/Header/header";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "../Redux-toolkit/Store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import productData from "../product.json"; // Adjust the path as per your project structure
import { addProductData } from "../Redux-toolkit/Reducer";

export default function App({ Component, pageProps }) {
  const persistor = persistStore(store);

  useEffect(() => {
    store.dispatch(addProductData(productData));
  }, []);

  return (
    <>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          {/* header component */}
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </Provider>
      </PersistGate>
    </>
  );
}
