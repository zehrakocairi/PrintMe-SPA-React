import { CustomLink } from "../../data/types";
import { FC } from "react";
import twFocusClass from "../../utils/twFocusClass";
import Button from "../Button/Button";
import { useFilter } from "../../contexts/FilterContext";

export interface PaginationProps {
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = "" }) => {
  const {pageIndex, setPageIndex, totalPages} = useFilter();

  const renderItem = (index: number) => {
    if (index === pageIndex) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {index+1}
        </span>
      );
    }

    return (
      <Button
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={() => {setPageIndex(index)}}
      >
        {index+1}
      </Button>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {

        Array.from({ length: totalPages }, (_, index) => renderItem(index))
      }
    </nav>
  );
};

export default Pagination;
