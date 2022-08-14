import React, { useEffect, useState } from "react";

import { BASE_URL } from "../config/config";

interface SearchParamsObj {
  keyword: string;
  price: string;
  color: string;
  category: null;
  sort: string;
}
interface SidePanelProps {
  searchParams: SearchParamsObj;
  setSearchParams: React.Dispatch<React.SetStateAction<any>>;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const [categories, setCategories] = useState<Array<string> | null>([]);
  const [catLoading, setCatLoading] = useState(false);
  const [catError, setCatError] = useState<string | null>(null);

  // Load categories on page load
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/categories`);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        let actualData = await response.json();
        setCategories(actualData);
        setCatError(null);
      } catch (err) {
        if (err instanceof Error) {
          setCatError(err.message);
          setCategories(null);
        }
      } finally {
        setCatLoading(false);
      }
    };
    getData();
  }, []);

  const handleParamsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target = event.currentTarget;
    setSearchParams({
      ...searchParams,
      [target.name]: target.value,
    });
  };

  const handleChangeCategory = (
    event: React.MouseEvent<HTMLLIElement | HTMLDivElement>
  ) => {
    if (
      !(
        event.target instanceof HTMLLIElement ||
        event.target instanceof HTMLDivElement
      )
    ) {
      return;
    }
    setSearchParams({ ...searchParams, category: event.target.dataset.value });
  };
  return (
    <div className="col-3">
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-2">
          <h5 style={{ fontWeight: "bold" }}>Price</h5>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={{ width: "20px", color: "#f86338" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
        </div>
        <div>
          <input
            type="range"
            className="form-range"
            min="0"
            max="1000"
            step="1"
            id="customRange3"
            name="price"
            defaultValue={searchParams.price}
            onChange={handleParamsChange}
          ></input>
          <label htmlFor="customRange3" className="form-label">
            Range: $0 - ${searchParams.price}
          </label>
        </div>
      </div>
      <div className="mb-5">
        <h5 style={{ fontWeight: "bold" }}>Categories</h5>
        <div>
          <ul className="categories">
            {/* {categories} */}
            <li
              className="d-flex justify-content-between"
              data-value={""}
              onClick={handleChangeCategory}
              style={{
                backgroundColor: searchParams.category === "" ? "#e2e2ea" : "",
              }}
            >
              <div
                style={{
                  textTransform: "capitalize",
                }}
                onClick={handleChangeCategory}
                data-value={""}
                id="all-categories-button"
              >
                All Categories
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ width: "20px" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </li>
            {categories?.map((category) => (
              <li
                className="d-flex justify-content-between"
                key={category + "_key"}
                data-value={category}
                onClick={handleChangeCategory}
                style={{
                  backgroundColor:
                    searchParams.category === category ? "#e2e2ea" : "",
                }}
              >
                <div
                  style={{ textTransform: "capitalize" }}
                  onClick={handleChangeCategory}
                  data-value={category}
                >
                  {category}
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ width: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="promo"
        style={{ backgroundColor: "#f86338", color: "#fff" }}
      >
        <h4>March Discount</h4>
        <p>Up to 70% Off for All Items in March</p>
        <button className="promo-btn">
          Got it
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            style={{ width: "20px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
