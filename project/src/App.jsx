import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HostResveList from "./components/HostResve/HostResveList";
import HostResve from "./components/HostResve/HostResve";
import GuestResve from "./components/GuestResve/GuestResve";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";
import TopButton from "./components/TopButton/TopButton";
import "./index.css";

export default function App() {
  return (
    <>
      <Header />
      <Main />
      {/* 숙소정보 (accommodationId) 필요 */}
      <HostResveList id="673564ee5e0c0c385433c89c" />
      {/* 예약정보 (reservationId) 필요 */}
      <HostResve id="6736cf81ecb105bbcde2471e" />
      <GuestResve id="6736cf81ecb105bbcde2471e" />
      <Footer />
      <TopButton />
    </>
  );
}
