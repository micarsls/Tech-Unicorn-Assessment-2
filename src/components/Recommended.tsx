import React from "react";

import { RecommendedItem } from "./RecommendedItem";

interface Item {
  id: string | number;
  image: string;
  title: string;
  price: number | string;
}

interface RecommendedProps {
  recommended: Array<Item>;
}

export const Recommended: React.FC<RecommendedProps> = ({ recommended }) => {
  return (
    <div className="mb-5">
      <h1>Recommended for you</h1>
      <div className="grid-recommended mt-4">
        {recommended.map((item) => (
          <RecommendedItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};
