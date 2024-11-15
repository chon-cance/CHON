import Footer from "./components/Footer/Footer";
import GuestResve from "./components/GuestResve/GuestResve";
import Header from "./components/Header/Header";
import HostResve from "./components/HostResve/HostResve";
import Main from "./components/Main/Main";

import "./index.css";

export default function App() {
  return (
    <>
      <GuestResve />
      <HostResve />
      <Header />
      <Main />
      <Footer />
    </>
  );
}
