import { useState } from "react";

import Modal from "../../../../Modal/Modal";
import CardSkeleton from "../../../../CardSkeleton/CardSkeleton";

import styles from "./ChonCard.module.css";

export default function ChonCard({ accommodations }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!accommodations) return null;

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      {!isImageLoaded && <CardSkeleton />}

      <div
        className={`${styles.card} ${
          isImageLoaded ? styles.visible : styles.hidden
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={styles.card_img}>
          <img
            src={`/img/${accommodations.accommodation_num}/${accommodations.photo[0]}`}
            alt={`${accommodations.name}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        <div className={styles.chon_address}>
          <div className={styles.address}>{accommodations.address}</div>
          <div>
            <span>
              <img src="/img/star.png" alt="star" />
            </span>
            <span>
              {accommodations.grade}({accommodations.review.length})
            </span>
          </div>
        </div>
        <div className={styles.chon_name}>{accommodations.name}</div>
      </div>

      {isModalOpen && (
        <Modal
          accommodation={accommodations}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
