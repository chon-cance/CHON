import styles from "./ChonCard.module.css";
import star from "../../../../../assets/img/star.png";

export default function ChonCard({ accommodations }) {
  if (!accommodations) return null;

  // 동적 이미지 import
  const getImageUrl = (accNum) => {
    try {
      return new URL(
        `../../../../../assets/img/${accNum}/01.jpg`,
        import.meta.url
      ).href;
    } catch (error) {
      return defaultImg;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_img}>
        <img
          src={getImageUrl(accommodations.accommodation_num)}
          alt={accommodations.name}
          onError={(e) => {
            console.log("⚠️ 이미지 로드 실패:", e.target.src);
          }}
        />
      </div>
      <div className={styles.chon_address}>
        <div>{accommodations.address}</div>
        <div>
          <span>
            <img src={star} />
          </span>
          <span>4.5(3)</span>
        </div>
      </div>
      <div className={styles.chon_name}>{accommodations.name}</div>
    </div>
  );
}
