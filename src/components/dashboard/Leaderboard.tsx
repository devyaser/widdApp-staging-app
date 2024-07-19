import Image from "next/image";
import ClickableCard from "../common/ClickableCard";
import { useRouter } from "next/router";
// import Carousel from "react-carosusel";
import { Carousel } from "react-responsive-carousel";

function Leader({
  avatar,
  rank,
  username,
  point1,
  point2,
  handleClick,
}: {
  avatar: string;
  rank: number;
  username: string;
  point1: number;
  point2: number;
  handleClick: Function;
}) {
  return (
    <tr className="border-none">
      <td className="p-0 pb-1 w-[calc(50%+8px)]">
        <div className="flex space-x-2 items-center">
          <div className="w-[15px]">
            <div className="text-[11px] text-white">{rank}</div>
          </div>
          <div className="w-[30px]">
            <Image src="/images/drone.gif" alt="Drone" width={30} height={30} />
          </div>
          <button
            className="btn bg-transparent hover:bg-transparent border-none hover:border-none p-0 min-h-fit h-auto cursor-pointer normal-case"
            onClick={() => handleClick()}
          >
            <span className="text-sm text-white">{username}</span>
          </button>
        </div>
      </td>
      <td className="p-0">
        <div className="flex gap-0.5">
          <Image
            src="/icons/point1.svg"
            alt="Transfer Icon"
            width={12}
            height={15}
          />
          <span className="text-sm text-white">{point1}</span>
        </div>
      </td>
      <td className="p-0">
        <div className="flex gap-0.5">
          <Image
            src="/icons/point2.svg"
            alt="Transfer Icon"
            width={12}
            height={15}
          />
          <span className="text-sm text-white">{point2}</span>
        </div>
      </td>
    </tr>
  );
}

const leaders = [
  { rank: 1, avatar: "", username: "Zekken", point1: 1800, point2: 30 },
  { rank: 2, avatar: "", username: "henrythe", point1: 800, point2: 20 },
  { rank: 3, avatar: "", username: "xQC", point1: 500, point2: 60 },
  { rank: 4, avatar: "", username: "Yagenl", point1: 200, point2: 80 },
  { rank: 5, avatar: "", username: "gohstchil", point1: 100, point2: 10 },
  { rank: 6, avatar: "", username: "CSHistor", point1: 80, point2: 10 },
  { rank: 7, avatar: "", username: "Chriztianl", point1: 50, point2: 15 },
  { rank: 8, avatar: "", username: "Bandanna", point1: 30, point2: 30 },
  { rank: 9, avatar: "", username: "Baiboris", point1: 10, point2: 2 },
  { rank: 10, avatar: "", username: "Zekken", point1: 1800, point2: 30 },
  { rank: 11, avatar: "", username: "henrythe", point1: 800, point2: 20 },
  { rank: 12, avatar: "", username: "xQC", point1: 500, point2: 60 },
  { rank: 13, avatar: "", username: "Yagenl", point1: 200, point2: 80 },
  { rank: 14, avatar: "", username: "gohstchil", point1: 100, point2: 10 },
  { rank: 15, avatar: "", username: "CSHistor", point1: 80, point2: 10 },
  { rank: 16, avatar: "", username: "Chriztianl", point1: 50, point2: 15 },
  { rank: 17, avatar: "", username: "Bandanna", point1: 30, point2: 30 },
  { rank: 18, avatar: "", username: "Baiboris", point1: 10, point2: 2 },
];

export default function Leaderboard() {
  const router = useRouter();

  const handleItemClick = (username: string) => {
    router.push(`?type=person&username=${username}`);
  };

  const handleClick = () => {
    router.push(`?type=leaderboard`);
  };

  return (
    <ClickableCard title={"Trending Slap"} handleClick={handleClick}>
      <div>
        <Carousel
          axis="vertical"
          autoPlay
          interval={3000}
          infiniteLoop
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          showThumbs={false}
        >
          {Array.from({ length: leaders.length / 6 }, (_, index) => index).map(
            (leader, sliceIdx) => (
              <div key={sliceIdx} className="h-[250px] px-2">
                <table className="table no-border">
                  <tbody>
                    {leaders
                      .slice(sliceIdx * 6, sliceIdx * 6 + 6)
                      .map((leader, i) => (
                        <Leader
                          key={i}
                          rank={leader.rank}
                          avatar={leader.avatar}
                          username={leader.username}
                          point1={leader.point1}
                          point2={leader.point2}
                          handleClick={() => handleItemClick(leader.username)}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </Carousel>
      </div>
    </ClickableCard>
  );
}
