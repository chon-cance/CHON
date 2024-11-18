import { useState } from "react";
import ReactPaginate from "react-paginate";
import ChonCard from "../Main/List/SwiperChonList/ChonCard/ChonCard";
import styles from "./AccomSearchTest.module.css";

export default function AccomSearchTest({ accommodations }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

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
      <div className={styles.cardContainer}>
        {currentAccommodations.map((accommodation) => (
          <ChonCard key={accommodation.id} accommodations={accommodation} />
        ))}
      </div>

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
    </div>
  );
}
