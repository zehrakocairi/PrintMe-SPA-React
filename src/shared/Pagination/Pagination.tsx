import { CustomLink } from "../../data/types";
import { FC } from "react";
import twFocusClass from "../../utils/twFocusClass";
import Button from "../Button/Button";
import { useFilter } from "../../contexts/FilterContext";

export interface PaginationProps {
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = "" }) => {
  const { pageIndex, setPageIndex, totalPages } = useFilter();

  const renderItem = (index: number) => {
    if (index === pageIndex) {
      return (
        <span key={index} className={`inline-flex w-[50px] h-[50px] items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}>
          {index + 1}
        </span>
      );
    }

    return (
      <Button
        key={index}
        className={`inline-flex w-[50px] h-[50px] items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 ${twFocusClass()}`}
        onClick={() => {
          setPageIndex(index);
        }}
      >
        {index + 1}
      </Button>
    );
  };

  return (
    <nav className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}>
      <Button
        key="first"
        disabled={pageIndex <= 0}
        className={`inline-flex w-[50px] h-[50px] items-center justify-center rounded-full bg-white text-neutral-6000 disabled:text-neutral-300 ${twFocusClass()}`}
        onClick={() => {
          setPageIndex(0);
        }}
      >
        First
      </Button>
      {Array.from({ length: totalPages }, (_, index) => index)
        .filter((index) => index >= pageIndex - 4 && index <= pageIndex + 4)
        .map((index) => renderItem(index))}
      <Button
        key="next"
        disabled={totalPages <= pageIndex + 1}
        className={`relative w-[50px] h-[50px] items-center justify-center rounded-full bg-white text-neutral-6000 disabled:text-neutral-300 ${twFocusClass()}`}
        onClick={() => {
          setPageIndex(totalPages - 1);
        }}
      >
        Last
        <span className="absolute top-0 right-0 text-md text-[#a8bae9] z-10">{totalPages}</span>
      </Button>
    </nav>
  );
};

export default Pagination;
