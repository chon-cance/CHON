import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

export default function Modal({ accommodation, onClose }) {
  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={styles.imageSection}>
          {accommodation.photo.map((photo, index) => (
            <img
              key={index}
              src={`/img/${accommodation.accommodation_num}/${photo}`}
              alt={`숙소 이미지 ${index + 1}`}
            />
          ))}
        </div>

        <div className={styles.infoSection}>
          <h2>{accommodation.name}</h2>
          <p className={styles.address}>{accommodation.address}</p>
          <p className={styles.price}>
            가격: {accommodation.price.toLocaleString()}원
          </p>
          <div className={styles.description}>{accommodation.description}</div>
          {/* 추가 정보들 */}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
