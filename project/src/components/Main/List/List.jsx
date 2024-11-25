import styles from "./List.module.css";
import { useState, useEffect } from "react";
import SwiperChonList from "./SwiperChonList/SwiperChonList";

export default function List() {
  const [recentAccommodations, setRecentAccommodations] = useState([]);
  const [topGradeAccommodations, setTopGradeAccommodations] = useState([]);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [isLoadingTop, setIsLoadingTop] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingRecent(true);
        setIsLoadingTop(true);

        // 최신 숙소 API 호출
        const recentResponse = await fetch(
          "https://port-0-chon-m3qz4omzb344e0d7.sel4.cloudtype.app/accommodations/top_date"
        );
        const recentData = await recentResponse.json();
        setRecentAccommodations(recentData);
        setIsLoadingRecent(false);

        // 평점 높은 숙소 API 호출
        const topResponse = await fetch(
          "https://port-0-chon-m3qz4omzb344e0d7.sel4.cloudtype.app/accommodations/top_grade"
        );
        const topData = await topResponse.json();
        setTopGradeAccommodations(topData);
        setIsLoadingTop(false);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
        setIsLoadingRecent(false);
        setIsLoadingTop(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w1200">
        <div className={styles.chon_list}>
          <div className={styles.card_title}>
            <p>새로 입점했어요</p>
            <p>촌스럽게 신규 입점한 숙소를 만나보세요.</p>
          </div>
          <div className={styles.card_conteiner}>
            <SwiperChonList
              accommodations={recentAccommodations}
              isLoading={isLoadingRecent}
            />
          </div>
        </div>
        <div className={styles.chon_list}>
          <div className={styles.card_title}>
            <p>추천 촌캉스</p>
            <p>이벤트 진행중인 숙소를 만나보세요.</p>
          </div>
          <div className={styles.card_conteiner}>
            <SwiperChonList
              accommodations={topGradeAccommodations}
              isLoading={isLoadingTop}
            />
          </div>
        </div>
      </div>
    </>
  );
}
