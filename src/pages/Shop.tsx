import React, { useEffect, useState } from "react";

import { Hero } from "../components/Hero";
import { BASE_URL } from "../config/config";
import { Products } from "../components/Products";
import { SidePanel } from "../components/SidePanel";
import { Recommended } from "../components/Recommended";

interface ShopProps {}

interface SearchParamsObj {
  keyword: string;
  price: string;
  color: string;
  category: null;
  sort: string;
}

interface Data {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  count: number;
  rate: number;
  title: string;
}

export const Shop: React.FC<ShopProps> = ({}) => {
  const [searchParams, setSearchParams] = useState<SearchParamsObj>({
    keyword: "",
    price: "1000",
    color: "",
    category: null,
    sort: "asc",
  });
  const [data, setData] = useState<Array<Data>>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommended, setRecommended] = useState([]);
  // Array of filtered items
  const [selected, setSelected] = useState<Array<Data>>([]);

  // Get data before hand as the api has limited number of parameters
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      let actualData = await response.json();
      setData(actualData);
      setSelected(actualData);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setData([]);
      }
    } finally {
      setLoading(false);
    }
  };
  // Get recommended items on page load
  const getRecommended = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=8`);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      let actualData = await response.json();
      setRecommended(actualData);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Function
  const sort = () => {
    setLoading(true);
    let _data: Array<Data> = [];
    let matching_category: Array<Data> = [];
    let matching_keyword = [];
    // Check if a cetegory is selected
    if (searchParams.category) {
      matching_category = data.filter(
        (item) => item.category === searchParams.category
      );
    }
    // Copy data if none
    else if (!searchParams.category) {
      matching_category = data;
    }
    // Check if data is already filtered then filter using keyword/search term
    if (matching_category.length > 0) {
      matching_keyword = matching_category.filter((item) =>
        item.title.toLowerCase().includes(searchParams.keyword)
      );
    }
    // Use uncategorized data if there is no category selected
    else {
      matching_keyword = matching_category.filter((item) =>
        item.title.toLowerCase().includes(searchParams.keyword)
      );
    }
    // Check if data has been filtered using keyword
    if (matching_keyword.length > 0) {
      _data = matching_keyword.filter(
        (item) => item.price <= parseFloat(searchParams.price)
      );
    }
    // Sort by price according to default or user's parameters
    if (searchParams.sort === "asc") {
      _data.sort((a, b) => a.price - b.price);
    } else {
      _data.sort((a, b) => b.price - a.price);
    }
    // Set final list of products for display
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setSelected(_data);
    }, 500);
  };

  // Filter data when search parameters change
  useEffect(() => {
    sort();
  }, [searchParams]);

  useEffect(() => {
    getData();
    getRecommended();
  }, []);

  return (
    <div className="container">
      <Hero />
      <div className="d-flex" style={{ marginBottom: "10rem" }}>
        <SidePanel
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
        <Products
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          data={selected}
          isLoading={isLoading}
          error={error}
        />
      </div>
      <Recommended recommended={recommended} />
    </div>
  );
};
