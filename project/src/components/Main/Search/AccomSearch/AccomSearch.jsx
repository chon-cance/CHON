import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ChonCard from "../../List/SwiperChonList/ChonCard/ChonCard";
import styles from "./AccomSearch.module.css";

export default function AccomSearch({ accommodations }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // 화면 크기에 따라 itemsPerPage 조절
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 1000) {
        setItemsPerPage(4);
      } else if (width > 710) {
        setItemsPerPage(3);
      } else if (width > 400) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    // 초기 실행
    handleResize();

    // resize 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 전체 페이지 수 계산
  const pageCount = Math.ceil(accommodations?.length / itemsPerPage);

  // 현재 페이지에 표시할 숙소 데이터
  const currentAccommodations = accommodations?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (!accommodations || accommodations.length === 0) return null;

  return (
    <div className={styles.container}>
      <ReactPaginate
        previousLabel={null}
        nextLabel={null}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        previousClassName={styles.navButton}
        nextClassName={styles.navButton}
        disabledClassName={styles.disabled}
        pageClassName={styles.pageItem}
      />

      <div className={styles.cardContainer}>
        {currentAccommodations.map((accommodation) => (
          <ChonCard key={accommodation._id} accommodations={accommodation} />
        ))}
      </div>
    </div>
  );
}
