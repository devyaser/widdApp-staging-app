import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope } from "react-icons/fa";

import { Theme } from "react-dex-chart/lib/esm/TradeChart/themes/chartTheme";
import dynamic from "next/dynamic";
import { ChartSettings } from "react-dex-chart/lib/esm/TradeChart/types";
// const ChartSettings = dynamic(
//   () => import("react-dex-chart").then((mod) => (mod as any).ChartSettings),
//   {
//     ssr: false,
//   }
// );
const presetSettings = dynamic(
  () => import("react-dex-chart").then((mod) => (mod as any).presetSettings),
  {
    ssr: false,
  }
);
const TradeChart = dynamic(() => import("react-dex-chart").then((mod) => mod.TradeChart), {
  ssr: false,
});

const sponsors = [
  "/images/Rectangle 7.png",
  "/images/Rectangle 8.png",
  "/images/Rectangle 6.png",
  // "/images/Rectangle 8.png",
];

let tvScriptLoadingPromise: any = null;

export default function RightPart() {
  const themePreset: Theme = {
    name: "dark",
    //default for now
    candleStickConfig: {
      priceFormat: {
        type: "price",
        minMove: 0.001,
      },
    },
    histogramConfig: {
      visible: true,
      priceLineVisible: false,
      lastValueVisible: false,
      overlay: true,

      scaleMargins: {
        top: 0.85,
        bottom: 0,
      },
    },
    chartLayout: {
      layout: {
        backgroundColor: "rgba(7, 7, 28, 1)",
        lineColor: "#2B2B43",
        textColor: "#D9D9D9",
        watermarkColor: "rgba(250, 250, 250, .2)",
      },
      grid: {
        vertLines: {
          color: "rgba(250, 250, 250, .1)",
        },
        horzLines: {
          color: "rgba(250, 250, 250, .1)",
        },
      },
    },
  } as any;

  const [interval, setInterval] = useState<string>("1h");
  const [settings, setSetting] = useState<ChartSettings>({
    timezone: {
      locale: "-4 UCT (NY)",
      showSessions: false,
    },
    trade: {
      showExecutions: true,
      showOrders: true,
      showPositions: true,
      extendLines: true,
      playSound: true,
    },

    background: {
      gradient: false,
      color: undefined,
      watermark: true,
      watermarkText: "{PAIR} {INTERVAL}",
    },
  } as any);

  const resetSettings = (s: string) =>
    setSetting({
      ...presetSettings,
    } as any);

  const updateSetting = ({
    section,
    type,
    value,
  }: {
    section: string;
    type: string;
    value: any;
  }) => {
    let state: ChartSettings = settings;
    let newState: ChartSettings = settings;
    switch (section) {
      case "trade":
        state = {
          ...settings,
          trade: {
            ...settings.trade,
            [type]: value,
          },
        };
        break;
      case "background":
        state = {
          ...settings,
          background: {
            ...settings.background,
            [type]: value,
          },
        };

        break;
      case "timezone":
        state = {
          ...settings,
          timezone: {
            ...settings.timezone,
            [type]: value,
          },
        };
        break;
      default:
        break;
    }

    newState = {
      ...state,
    };

    setSetting(newState);
  };

  return (
    <>
      <div className="w-[250px] px-5 pb-5 lg:flex flex-col hidden">
        <div className="border-b border-custom-border">
          <div className="mb-[15px] pt-4 px-2 text-center">
            <div className="text-sm text-custom-darkgraythree">BOTRIX TALKS</div>
          </div>
          <div className="mb-[15px]" id="tradingview_fb03a">
            {/* <TradeChart
              marketInfo={{
                exchange: "binance",
                pricePrecisionDecimal: 6,
                image: null,
                baseAsset: { symbol: "BTC" },
                quoteAsset: { symbol: "USDT" },
              }}
              userFills={[
                {
                  id: 1,
                  price: 1150,
                  side: "b",
                  market: "ETH-USDT",
                  time: new Date().getTime() / 1000 - 36000,
                },
                {
                  id: 1,
                  price: 1250,
                  side: "s",
                  market: "ETH-USDT",
                  time: new Date().getTime() / 1000,
                },
              ]}
              userOrders={[
                { price: "1100", size: "1", side: "b", market: "ETH-USDT", status: "o" },
              ]}
              interval={interval}
              setInterval={setInterval}
              intervals={[
                { id: 0, value: "1m", string: "1 Minutes" },
                { id: 1, value: "5m", string: "5 Minutes" },
                { id: 2, value: "15m", string: "30 Minutes" },
                { id: 3, value: "1h", string: "Hourly" },
                { id: 4, value: "2h", string: "2 Hours" },
                { id: 5, value: "4h", string: "4 Hours" },
                { id: 6, value: "1d", string: "Daily" },
                { id: 7, value: "1w", string: "Weekly" },
                { id: 8, value: "1M", string: "Monthly" },
              ]}
              candleStickConfig={themePreset.candleStickConfig}
              histogramConfig={themePreset.histogramConfig}
              chartLayout={themePreset.chartLayout}
              reset={resetSettings}
              updateSetting={updateSetting}
              settings={settings}
            /> */}
            <Image src="/images/botrix-banners.png" alt="Transfer Icon" width={210} height={100} />
          </div>
        </div>
        <div className="pt-4 px-2 text-center">
          <div className="text-sm text-custom-darkgraythree"></div>
        </div>
        <div className="pt-4 px-2 text-center relative">
          <div className="text-sm text-custom-darkgraythree">SPONSORS</div>
          <a
            href="mailto:admin@botrixai.io"
            className="absolute top-1 right-0 text-white normal-case btn bg-transparent hover:bg-transparent border-transparent hover:border-transparent"
          >
            <FaEnvelope className="text-xl hover:scale-110" style={{ fill: "#D02BB6" }} />
          </a>
        </div>
        <div className="max-h-[calc(100%-220px)] no-scrollbar overflow-y-auto pr-2">
          {sponsors.map((sponsor) => (
            <div className="rounded-[5px] mt-[15px]" key={sponsor}>
              <Image src={sponsor} alt="Transfer Icon" width={211} height={200} />{" "}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-[56px] w-full left-0 bg-custom-lightgraythree p-1 z-10 flex lg:hidden">
        <Image src="/images/banner1.png" alt="Transfer Icon" width={135} height={64} />
        <div className="ml-2 flex gap-1 h-[64px]">
          {sponsors.map((sponsor) => (
            <div className="rounded-[5px]" key={sponsor}>
              <Image src={sponsor} alt="Transfer Icon" width={67} height={64} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
