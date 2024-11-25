import Skeleton from "react-loading-skeleton";
import styles from "./CardSkeleton.module.css";
const CardSkeleton = () => {
  return (
    <>
      <div className={styles.skeleton_card}>
        <div className={styles.skeleton_card_img}>
          <Skeleton />
        </div>
        <div className={styles.skeleton_chon_address}>
          <div className={styles.skeleton_address}>
            <Skeleton />
          </div>
          <div>
            <span className={styles.skeleton_star}>
              <Skeleton />
            </span>
          </div>
        </div>
        <div className={styles.skeleton_chon_name}>
          <Skeleton />
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;
