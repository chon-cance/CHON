import React, { useState } from "react";
import Modal from "./Modal";
import "./Modal.css"; // Modal 스타일 불러오기

const RoomDetails = ({ accommodation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!accommodation) return null;

  const { name, address, person, max_person, price, explain, photo, review } =
    accommodation;
  console.log(accommodation);
  return (
    <div>
      <button onClick={openModal} className="open-modal-button">
        숙소 상세 보기
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="modal-image-section">
          <img
            src={`/img/${accommodation.accommodation_num}/${photo[0]}`}
            alt={`${name} 이미지`}
            className="modal-image"
          />
          <div className="modal-image-counter">1 / {photo.length}</div>
        </div>
        <div className="modal-content">
          <div className="modal-left">
            <h2 className="modal-title">{name}</h2>
            <p className="modal-description">{explain}</p>
            <p className="modal-address">📍 {address}</p>
            <div className="modal-capacity">
              <span>👥 기준 {person}인</span>
              <span className="divider">|</span>
              <span>최대 {max_person}인</span>
            </div>
            <div className="modal-price">₩ {price}</div>
          </div>
          <div className="modal-right">
            <h3 className="modal-reviews">
              후기 ⭐ {review.rating} ({review.count})
            </h3>
            <textarea
              className="modal-textarea"
              placeholder="전달 사항을 기입해주세요."
            ></textarea>
            <button className="modal-book-button">예약 신청하기</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoomDetails;
