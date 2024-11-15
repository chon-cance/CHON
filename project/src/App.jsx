import Footer from "./components/Footer/Footer";
import GuestResve from "./components/GuestResve/GuestResve";
import Header from "./components/Header/Header";
import HostResve from "./components/HostResve/HostResve";
import Main from "./components/Main/Main";

import "./index.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

export default function App() {
  return (
    <>
      <Register />
      <Header />
      <Main />
      <Footer />
    </>
  );
}
