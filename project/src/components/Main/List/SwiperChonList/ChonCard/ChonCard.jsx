import styles from "./ChonCard.module.css";
import star from "../../../../../assets/img/star.png";
import img from "../../../../../assets/img/listimg1.png";

export default function ChonCard() {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.card_img}>
          <img src={img} />
        </div>
        <div className={styles.chon_address}>
          <div>경상북도 청송군</div>
          <div>
            <span>
              <img src={star} />
            </span>
            <span>4.5(3)</span>
          </div>
        </div>
        <div className={styles.chon_name}>안평재</div>
      </div>
    </>
  );
}
