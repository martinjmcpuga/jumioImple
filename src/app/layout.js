
import Header from "./components/NavBar/Header";
import "./globals.css";
import inter from "./components/Fonts/Fonts";
import { AppProvider } from './context/AppContext';
import { Suspense } from "react";

  export const metadata = {
  title: 'DPR',
  icons: {
    icon: '/dpr_lab_logo.ico',
  }
};


export default function RootLayout({ children }) {




  return (
    <Suspense fallback={<div>Loading...</div>}>
    <AppProvider>
    <html lang="en">

      <body
        className={` antialiased ${inter.className} initBack_P2 animate__animated animate__fadeIn`}
      >
        <Header/>
        {children}
       
      </body>
    </html>
    </AppProvider>
    </Suspense>
  );
}
