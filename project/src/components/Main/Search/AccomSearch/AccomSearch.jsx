import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import ChonCard from "../../List/SwiperChonList/ChonCard/ChonCard";
import CardSkeleton from "../../../CardSkeleton/CardSkeleton";

import styles from "./AccomSearch.module.css";
import "react-loading-skeleton/dist/skeleton.css";

export default function AccomSearch({ accommodations, isLoading }) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    if (!accommodations) return;

    setImagesLoaded(false);
    setShowSkeleton(true);

    const loadImages = async () => {
      try {
        const imagePromises = accommodations.map((accommodation) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject();
            img.src = `/img/${accommodation.accommodation_num}/${accommodation.photo[0]}`;
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);

        // 이미지 로딩 완료 후 300ms 후에 스켈레톤을 숨김
        setTimeout(() => {
          setShowSkeleton(false);
        }, 300);
      } catch (error) {
        console.error("이미지 로딩 실패:", error);
        setImagesLoaded(true);
        setTimeout(() => {
          setShowSkeleton(false);
        }, 300);
      }
    };

    loadImages();
  }, [accommodations]);

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

  // 로딩 중이거나 이미지가 로드되지 않았을 때 스켈레톤 표시
  if (isLoading || showSkeleton) {
    return (
      <div className={styles.skeleton_container}>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            {Array(itemsPerPage)
              .fill(null)
              .map((_, index) => (
                <CardSkeleton key={`skeleton-${index}`} />
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (!accommodations || accommodations.length === 0) {
    return <div className={styles.empty_text}>검색된 숙소가 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <ReactPaginate
        previousLabel={null}
        nextLabel={null}
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
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
