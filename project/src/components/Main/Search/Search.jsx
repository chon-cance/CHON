import styles from "./Search.module.css";
import searchIcon from "/img/searchIcon.png";

export default function Search() {
  return (
    <div className={styles.search}>
      <div className="w1200">
        <div className={styles.search_conteiner}>
          <div className={styles.search_title}>촌캉스 숙소 검색하기</div>
          <div className={styles.search_warp}>
            <div className={styles.search_category_warp}>
              <div className={styles.search_category}>지역</div>
              <div className={styles.search_value}>지역 검색</div>
            </div>
            <div className={styles.search_category_warp}>
              <div className={styles.search_category}>체크인</div>
              <div className={styles.search_value}>날짜 추가</div>
            </div>
            <div className={styles.search_category_warp}>
              <div className={styles.search_category}>체크아웃</div>
              <div className={styles.search_value}>지역 검색</div>
            </div>
            <div className={styles.search_category_warp}>
              <div className={styles.search_category}>인원수</div>
              <div className={styles.search_value}>게스트 추가</div>
            </div>
            <div className={styles.search_Btn_warp1}>
              <a href="" className={styles.search_Btn1}>
                <img src={searchIcon} />
              </a>
            </div>
          </div>
          <a className={styles.search_Btn_warp2}> 검색하기 </a>
        </div>
      </div>
    </div>
  );
}
