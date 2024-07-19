import Image from "next/image";
import ClickableCard from "../common/ClickableCard";
import { useRouter } from "next/router";

import { trendings } from "../../mock-data";
// import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import { useDebounce } from "usehooks-ts";
import { useRef } from "react";

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplaySpeed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  draggable: true,
  vertical: true,
  autoplay: true,
  swipeToSlide: true,
  swipe: true,
};

export function TrendingItem({ rank, label }: { rank: number; label: string }) {
  const getAvatar = () => {
    switch (rank) {
      case 1:
        return "/images/gold-medal.png";
      case 2:
        return "/images/gold-medal-2.png";
      case 3:
        return "/images/gold-medal-3.png";
      default:
        return "";
    }
  };
  return (
    <div className="px-2 flex gap-2 items-center">
      {rank < 4 ? (
        <Image src={getAvatar()} alt="Trending Image" width={20} height={20} />
      ) : (
        <div className="w-5 text-center text-[11px] text-white">{rank}</div>
      )}
      <span className="text-xl text-custom-gray text-bold">#</span>
      <div className="text-sm text-white">{label}</div>
    </div>
  );
}

export default function Trending() {
  const ref = useRef(null);
  const router = useRouter();

  const handleClick = () => {
    router.push(`?type=all_chats`);
  };

  // const onWheelSlider = useDebounce((e) => {
  //   console.log(`onWheelSlider`, e);
  //   if (!ref.current || !e) return;

  //   if (e.deltaX > 0) {
  //     ref.current.slickNext();
  //   } else if (e.deltaX < 0) {
  //     ref.current.slickPrev();
  //   }
  // }, 20);

  const onWheelSlider = (e: any) => {
    if (!ref.current || !e) return;

    if (e.deltaY > 0) {
      (ref.current as any).slickNext();
    } else if (e.deltaY < 0) {
      (ref.current as any).slickPrev();
    }
  };

  return (
    <ClickableCard title={"Trending"} handleClick={handleClick}>
      <div onWheel={onWheelSlider}>
        <Slider {...settings} ref={ref}>
          {trendings.map((trendingItem, leaderIdx) => (
            <div key={leaderIdx} className="h-[30px]">
              <TrendingItem rank={leaderIdx + 1} label={trendingItem.label} />
            </div>
          ))}
        </Slider>
      </div>
    </ClickableCard>
  );
}
