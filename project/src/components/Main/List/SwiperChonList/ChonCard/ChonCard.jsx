import styles from "./ChonCard.module.css";

export default function ChonCard({ accommodations }) {
  if (!accommodations) return null;

  const backgroundStyle = {
    backgroundImage: `url(/img/${accommodations.accommodation_num}/${accommodations.photo[0]})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  console.log(
    "🖼️ 이미지 경로:",
    `/img/${accommodations.accommodation_num}/${accommodations.photo[0]}`
  );
  console.log("💅 스타일 객체:", backgroundStyle);

  const handleImageError = (e) => {
    const element = e.target;
    element.style.backgroundImage = "url(/img/default.jpg)";
    console.log("이미지 로드 실패");
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.card_img}
        style={backgroundStyle}
        onError={handleImageError}
      ></div>
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
