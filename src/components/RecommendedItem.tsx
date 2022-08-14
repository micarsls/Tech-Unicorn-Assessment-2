import React from "react";

import { recommendedItemStyle } from "../style/style";

interface RecommendedItemProps {
  item: {
    id: number | string;
    image: string;
    title: string;
    price: number | string;
  };
}

export const RecommendedItem: React.FC<RecommendedItemProps> = ({ item }) => {
  return (
    <div className="mx-2 mb-4" style={recommendedItemStyle.card}>
      <div
        className="shadow-sm"
        style={{
          position: "relative",
          height: "18rem",
          overflow: "hidden",
        }}
      >
        <img
          src={item?.image}
          alt={item?.title}
          style={recommendedItemStyle.recommendedImg}
        />
      </div>
      <div className="d-flex-col mt-4">
        <h5 className="text-center mb-2" style={recommendedItemStyle.title}>
          {item?.title}
        </h5>
        <p className="text-center mb-4 price-text">${item?.price}</p>
      </div>
    </div>
  );
};
