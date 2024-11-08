import "./paginationStyles.scss";
import React, { memo } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { PER_PAGE_COUNT, PAGE_RANGE } from "../../utils/constants";

const Pagination = ({ size, handlePageChange, page }) => {
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaChevronRight className="text-black-custom fs-4" />}
        onPageChange={handlePageChange}
        pageRangeDisplayed={PAGE_RANGE}
        pageCount={size / PER_PAGE_COUNT}
        previousLabel={<FaChevronLeft className="text-black-custom fs-4" />}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        activeLinkClassName={"activePageLink"}
        forcePage={page - 1}
      />
    </>
  );
};

export default memo(Pagination);
