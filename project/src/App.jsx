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
<<<<<<< HEAD
      {/* 숙소정보 (accommodationId) 필요 */}
      <HostResveList id="673564ee5e0c0c385433c89c" />
      {/* 예약정보 (reservationId) 필요 */}
      <HostResve id="6736cf81ecb105bbcde2471e" />
      <GuestResve id="6736cf81ecb105bbcde2471e" />
=======
      <HostResve id="6736cf81ecb105bbcde2471e" />
      {/* 예약정보 (reservationId) 필요 */}
>>>>>>> 37722b304a4734eba968788a4649d8565d42bc24
      <Footer />
      <TopButton />
    </>
  );
}
