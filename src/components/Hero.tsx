import React from "react";

import { heroStyles } from "../style/style";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <div className="d-flex hero" style={heroStyles.hero_div}>
      <div className="d-flex align-items-center col-3">
        <div className="d-flex-col">
          <h6 style={heroStyles.hero_text}>{"Home > Shop"}</h6>
          <h1 style={heroStyles.hero_text}>Shop</h1>
        </div>
      </div>
      <div className="col-9" style={heroStyles.hero_img}></div>
    </div>
  );
};
