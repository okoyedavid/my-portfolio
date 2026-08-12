"use client";

type Props = {
  containerStyles: string;
  btnStyles: string;
  iconStyles: string;
};

import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

const WorkSliderBtns = ({ containerStyles, btnStyles, iconStyles }: Props) => {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button className={btnStyles} onClick={() => swiper.slidePrev()} aria-label="Previous screenshot" type="button">
        <PiCaretLeftBold className={iconStyles} aria-hidden="true" />
      </button>

      <button className={btnStyles} onClick={() => swiper.slideNext()} aria-label="Next screenshot" type="button">
        <PiCaretRightBold className={iconStyles} aria-hidden="true" />
      </button>
    </div>
  );
};

export default WorkSliderBtns;
