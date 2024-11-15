import styles from "./List.module.css";

import SwiperChonList from "./SwiperChonList/SwiperChonList";

export default function List() {
  return (
    <>
      <div className="w1200">
        <div className={styles.chon_list}>
          <div className={styles.card_title}>
            <p>새로 입점했어요</p>
            <p>촌스럽게 신규 입점한 숙소를 만나보세요.</p>
          </div>
          <div className={styles.card_conteiner}>
            <SwiperChonList />
          </div>
        </div>
        <div className={styles.chon_list}>
          <div className={styles.card_title}>
            <p>추천 촌캉스</p>
            <p>이벤트 진행중인 숙소를 만나보세요.</p>
          </div>
          <div className={styles.card_conteiner}>
            <SwiperChonList />
          </div>
        </div>
      </div>
    </>
  );
}
