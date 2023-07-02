import React from "react";
import { useAppContext } from "../context/context";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const prevPage = () => {
    // console.log("prev page");
    let newPage = page - 1;
    if (newPage < 1) {
      return;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    // console.log("next page");
    let newPage = page + 1;
    if (newPage > numOfPages) {
      return;
    }
    changePage(newPage);
  };
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  return (
    <div className="pages-container">
      <button onClick={prevPage} className="btn prev-btn">
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="pages">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              className={`btn ${pageNumber === page ? "page-btn-active" : ""}`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button onClick={nextPage} className="btn next-btn">
        Next
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};

export default PageBtnContainer;
