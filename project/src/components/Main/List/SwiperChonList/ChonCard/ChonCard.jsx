import styles from "./ChonCard.module.css";

export default function ChonCard({ accommodations }) {
  if (!accommodations) return null;

  return (
    <div className={styles.card}>
      <div className={styles.card_img}>
        <img
          src={`/img/${accommodations.accommodation_num}/${accommodations.photo[0]}`}
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
            <img src="/img/star.png" alt="star" />
          </span>
          <span>4.5(3)</span>
        </div>
      </div>
      <div className={styles.chon_name}>{accommodations.name}</div>
    </div>
  );
}
