import Label from "./Label/Label";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import ButtonPrimary from "../shared/Button/ButtonPrimary";
import Input from "../shared/Input/Input";
import Textarea from "../shared/Textarea/Textarea";
import Image from "../shared/Image";
import { useApplication } from "../contexts/ApplicationContext";
import { fetchWithAuth, getPutOptions } from "../fetch/fetchWrapper";
import { Fragment } from "react";
import { Popover, Transition } from "../headlessui";
import Checkbox from "../shared/Checkbox/Checkbox";
import { DATA_categories, DATA_catalog_tags } from "../components/TabFilters";
import { useTranslation } from "react-i18next";
import { Category } from "../enums/Category";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ButtonThird from "../shared/Button/ButtonThird";
import { CatalogTags } from "../enums/CatalogTags";

const UpdateProduct = ({ productId }: any) => {
    const { getToken } = useApplication();
    const [productData, setProductData] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        category: Category.None,
        tags: CatalogTags.Featured,
    });

    const { t } = useTranslation();

    const fetchProductData = async () => {
        const data = await fetchWithAuth(`/catalog/${productId}`, await getToken());
        setProductData(data);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    const handleChange = (e: ChangeEvent<any>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleCategoryChange = (isChecked: boolean, cat?: Category) => {
        if (!cat) {
            setProductData({ ...productData, category: Category.None });
            return;
        }
        let newState = isChecked
            ? (productData.category ?? cat) | cat
            : (productData.category ?? cat) & ~cat;

        setProductData({ ...productData, category: newState });
    };

    const handleCatalogTagChange = (isChecked: boolean, tag?: CatalogTags) => {
        if (!tag) {
            setProductData({ ...productData, tags: CatalogTags.None });
            return;
        }
        let newState = isChecked
            ? (productData.tags ?? tag) | tag
            : (productData.tags ?? tag) & ~tag;

        setProductData({ ...productData, tags: newState });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await fetchWithAuth(`/catalog/${productId}`, await getToken(), getPutOptions(productData));
        await fetchProductData();
    };

    const renderXClear = () => {
        return (
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
        );
    };


    const renderCateogoryMultiSelect = () => {
        return (
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
               ${open
                                    ? "!border-primary-500 "
                                    : "border-neutral-300 dark:border-neutral-700"
                                }
                ${!!productData.category !== undefined
                                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                                }
                `}
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2V5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 2V5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 13H15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 17H12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="ml-2">{t('Categories')}</span>
                            {productData.category == Category.None ? (
                                <ChevronDownIcon className="w-4 h-4 ml-3" />
                            ) : (
                                <span onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryChange(false);
                                }}>
                                    {renderXClear()}
                                </span>
                            )}
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        {DATA_categories.map((item: any) => {
                                            return (
                                                <div key={item.name} className="">
                                                    <Checkbox
                                                        name={item.name}
                                                        label={item.name}
                                                        defaultChecked={((productData.category ?? Category.None) & item.value) === item.value}
                                                        onChange={(checked) =>
                                                            handleCategoryChange(checked, item.value)
                                                        }
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                close();
                                                handleCategoryChange(false);
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Clear')}
                                        </ButtonThird>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderCatalogTagMultiSelect = () => {
        return (
            <Popover className="relative">
                {({ open, close }) => (
                    <>
                        <Popover.Button
                            className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none select-none
               ${open
                                    ? "!border-primary-500 "
                                    : "border-neutral-300 dark:border-neutral-700"
                                }
                ${!!productData.tags !== undefined
                                    ? "!border-primary-500 bg-primary-50 text-primary-900"
                                    : "border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500"
                                }
                `}
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2V5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 2V5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 13H15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7 17H12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            <span className="ml-2">{t('Tags')}</span>
                            {productData.tags == CatalogTags.None ? (
                                <ChevronDownIcon className="w-4 h-4 ml-3" />
                            ) : (
                                <span onClick={(e) => {
                                    e.preventDefault();
                                    handleCatalogTagChange(false);
                                }}>
                                    {renderXClear()}
                                </span>
                            )}
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel className="absolute z-40 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                                    <div className="relative flex flex-col px-5 py-6 space-y-5">
                                        {DATA_catalog_tags.map((item: any) => {
                                            return (
                                                <div key={item.name} className="">
                                                    <Checkbox
                                                        name={item.name}
                                                        label={item.name}
                                                        defaultChecked={((productData.tags ?? CatalogTags.None) & item.value) === item.value}
                                                        onChange={(checked) =>
                                                            handleCatalogTagChange(checked, item.value)
                                                        }
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                                        <ButtonThird
                                            onClick={() => {
                                                close();
                                                handleCatalogTagChange(false);
                                            }}
                                            sizeClass="px-4 py-2 sm:px-5"
                                        >
                                            {t('Clear')}
                                        </ButtonThird>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    return (
        <div className="nc-UpdateProduct">
            <div className="space-y-10 sm:space-y-12">
                <h2 className="text-2xl sm:text-3xl font-semibold">Update Product</h2>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <Label>Name</Label>
                                <Input
                                    className="mt-1.5"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <Label>Description</Label>
                                <Textarea
                                    className="mt-1.5"
                                    name="description"
                                    value={productData.description}
                                    onChange={handleChange}
                                    placeholder="Product Description"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <Label>Price</Label>
                                <Input
                                    className="mt-1.5"
                                    type="number"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleChange}
                                    placeholder="Product Price"
                                    required
                                />
                            </div>
                            <div className="flex">
                                <div className="mb-6">
                                    <Label>Categories</Label>
                                    {renderCateogoryMultiSelect()}
                                </div>

                                <div className="mb-6 ml-6">
                                    <Label>Tags</Label>
                                    {renderCatalogTagMultiSelect()}
                                </div>
                            </div>


                            <div className="pt-4">
                                <ButtonPrimary>Update Product</ButtonPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
