import Pagination from "../../shared/Pagination/Pagination";
import SectionPromo1 from "../../components/SectionPromo1";
import HeaderFilterSearchPage from "../../components/HeaderFilterSearchPage";
import Input from "../../shared/Input/Input";
import ButtonCircle from "../../shared/Button/ButtonCircle";
import ProductCard from "../../components/ProductCard";
import { useEffect, useState } from "react";
import { getFilteredPaginatedItems } from "../../services/catalogService";
import { Category } from "../../enums/Category";
import { useFilter } from "../../contexts/FilterContext";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { CatalogTags } from "../../enums/CatalogTags";


const PageSearch = () => {

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const location = useLocation();
  const pageInitiated = useRef(false);

  const { filter, filterChanged, setFilterChanged, setIsLoading, pageIndex, pageSize, updateCategoryState, updateSearchTextState, updateTagState, isLoading, setPageSize, setTotalPages } = useFilter();

  const fetchItems = async (category: Category = Category.None, searchTerm: string = "") => {
    setIsLoading(true);

    let categoryState = category;

    if (searchTerm.trim() !== "") {
      categoryState = Category.None;
    }
    if (categoryState != Category.None) {
      updateTagState(undefined);
    }

    const {data, totalPages} = await getFilteredPaginatedItems({ ...filter, categoryState }, pageSize, pageIndex, searchTerm);
    setTotalPages(totalPages ?? 1);
    setProducts(data);

    setIsLoading(false);
  };

  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };


  useEffect(() => {
    if(!pageInitiated.current) {
      return;
    }
    if (location.hash !== "") {
      handleScrollToEl(location.hash.split("#")[1])
    } else {
      handleScrollToEl('root')
    }
    
    fetchItems(filter.categoryState, filter.searchTerm);

  }, [filterChanged, pageIndex, pageSize]);


  useEffect(() => {
    const searchTerm = getSearchTermFromUrl();
    const tag = getCatalogTagFromUrl();
    const newCategory = getCategoryFromUrl() ?? Category.None;

    if (searchTerm !== "") {
      updateSearchTextState(searchTerm);
      updateTagState(undefined);
    }
    else if (tag !== "") {
      updateCategoryState(Category.None);
      updateTagState(tag ===  '4' ? CatalogTags.TopSellers : tag === '8' ? CatalogTags.OurPick : undefined);
      
    }
    else if (newCategory !== Category.None) {
      updateCategoryState(newCategory);
      updateTagState(undefined);
    }
    pageInitiated.current = true;
    setFilterChanged((prev) => !prev);
  }, [location.search]);

  function getCategoryFromUrl(): Category {
    let newCategory = Category.None;
    const urlParams = new URLSearchParams(location.search);
    const category = getCategoryKeyInsensitive(urlParams.get('category') ?? "");
    if (category && category in Category) {
      newCategory = Category[category as keyof typeof Category];
    }
    return newCategory;
  }

  function getSearchTermFromUrl(): string {
    return new URLSearchParams(location.search).get('searchTerm') ?? "";
  }
  function getCatalogTagFromUrl(): string {
    return new URLSearchParams(location.search).get('tag') ?? "";
  }

  function getCategoryKeyInsensitive(category: string): string | undefined {
    const lowerCaseCategory = category.toLowerCase().replaceAll("-", "");
    const categoryKeys = Object.keys(Category).filter(key => isNaN(Number(key))); // Get only string keys
    return categoryKeys.find(key => key.toLowerCase() === lowerCaseCategory);
  }

  function search() {
    updateCategoryState(Category.None);
    updateTagState(undefined);
    setSearchText(searchText.trim());
    fetchItems(Category.None, searchText);
  }

  return (
    <div className={`nc-PageSearch`} data-nc-id="PageSearch">
      <div
        className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
      />
      <div className="container">
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
          <div className="relative w-full ">
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                className="shadow-lg border-0 dark:border"
                id="search-input"
                type="search"
                placeholder="Type your keywords"
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                rounded="rounded-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <ButtonCircle
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                size=" w-11 h-11"
                onClick={search}
                type="button"
              >
                <i className="las la-arrow-right text-xl"></i>
              </ButtonCircle>
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </label>
          </div>
        </header>
      </div>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* FILTER */}
          <HeaderFilterSearchPage />

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {products.map((item, index) => (
              <ProductCard data={item} key={index} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
          </div>
        </main>


        <hr className="border-slate-200 dark:border-slate-700" />

        {/* SUBCRIBES */}
        <SectionPromo1 />
      </div>
    </div>
  );
};

export default PageSearch;
