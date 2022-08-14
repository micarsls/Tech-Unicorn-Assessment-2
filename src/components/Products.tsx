import React, { useEffect, useState } from "react";

import { ProductCard } from "./ProductCard";
import { productsStyle } from "../style/style";

interface Data {
  id: number;
  image: string;
  title: string;
  category: string;
  price: number;
}

interface SearchParamsObj {
  keyword: string;
  price: string;
  color: string;
  category: null;
  sort: string;
}

interface ProductsProps {
  data: Array<Data>;
  isLoading: boolean;
  error: string | null;
  searchParams: SearchParamsObj;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParamsObj>>;
}

export const Products: React.FC<ProductsProps> = ({
  data,
  isLoading,
  error,
  setSearchParams,
  searchParams,
}) => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.currentTarget;
    setSearchParams({ ...searchParams, keyword: target.value });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, sort: e.target.value });
  };
  const handleSelectPage = () => {
    setPage(
      page < data.length / itemsPerPage ? page + 1 : data.length / itemsPerPage
    );
  };

  //   Manually paginate data
  const paginate = (
    array_to_paginate: Array<Data>,
    page_size: number,
    page_number: number
  ) => {
    return array_to_paginate.slice(
      page_number * page_size,
      page_number * page_size + page_size
    );
  };

  // Resets page to 1 to prevent showing empty pages
  useEffect(() => {
    setPage(0);
  }, [data]);

  return (
    <div className="d-flex-col" style={{ width: "80%" }}>
      <div className="d-flex mx-2">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search products"
            aria-label="Search products"
            aria-describedby="button-addon2"
            onChange={handleSearchChange}
            style={productsStyle.searchInput}
          />
          <div
            className="btn"
            id="button-addon2"
            style={productsStyle.searchButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
              strokeWidth={2}
              style={productsStyle.svgIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mx-2 align-items-center">
        <div>Showing {data.length} Results</div>
        <div className="d-flex align-items-center">
          <select
            className="form-select"
            name="sort"
            defaultValue={searchParams.sort}
            onChange={handleSelectChange}
          >
            <option value="asc">Ascending Order</option>
            <option value="desc">Descending Order</option>
          </select>
        </div>
      </div>
      {/* Shows the products */}
      {data.length && !isLoading ? (
        <div className="grid-products-cols mt-4" style={{ display: "grid" }}>
          {paginate(data, itemsPerPage, page)?.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      ) : isLoading ? (
        <div className="d-flex justify-content-center my-5">
          <div
            className="spinner-border"
            role="status"
            style={{
              color: "#f86338",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="text-center my-5">No item matched your query.</div>
      )}
      <nav className="d-flex justify-content-center custom-pagination">
        <div style={{ cursor: "pointer" }}>
          <div
            aria-label="Previous"
            style={{ color: page > 0 ? "#f86338" : "#92929d", border: "none" }}
            onClick={() => {
              setPage(0);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={productsStyle.svgIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
        <div style={{ cursor: "pointer" }}>
          <div
            aria-label="Previous"
            style={{ color: page > 0 ? "#f86338" : "#92929d", border: "none" }}
            onClick={() => {
              setPage(page > 0 ? page - 1 : 0);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={productsStyle.svgIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>
        {/* Create an array of page numbers based on number of items and items per page */}
        {Array.from(
          Array(
            data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1
          ).keys()
        ).map((page_item) => (
          <div
            key={page_item}
            style={{
              cursor: "pointer",
            }}
          >
            <div
              style={{
                backgroundColor: page === page_item ? "#f86338" : "#fff",
                color: page === page_item ? "#fff" : "#92929d",
                border: "none",
                borderRadius: "50%",
              }}
              onClick={() => {
                setPage(page_item);
              }}
            >
              {page_item + 1}
            </div>
          </div>
        ))}
        <div style={{ cursor: "pointer" }}>
          <div
            aria-label="Next"
            style={{
              color: page < data.length / itemsPerPage ? "#f86338" : "#92929d",
              border: "none",
            }}
            onClick={handleSelectPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={productsStyle.svgIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <div style={{ cursor: "pointer" }}>
          <div
            aria-label="Next"
            style={{
              color: page < data.length / itemsPerPage ? "#f86338" : "#92929d",
              border: "none",
            }}
            onClick={() => {
              setPage(data.length / itemsPerPage);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={productsStyle.svgIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </nav>
    </div>
  );
};
