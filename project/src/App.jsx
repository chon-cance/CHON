import Footer from "./components/Footer/Footer";
import GuestResve from "./components/GuestResve/GuestResve";
import Header from "./components/Header/Header";
import HostResve from "./components/HostResve/HostResve";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

import "./index.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <HostResve id="6736cf81ecb105bbcde2471e" /> {/* 예약정보 (reservationId) 필요 */}
      <Footer />
    </>
  );
}
