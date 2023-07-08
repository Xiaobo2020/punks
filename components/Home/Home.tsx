import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import ButtonGroup from "../ButtonGroup";
import Checkbox from "../Checkbox";
import IdInput from "../IdInput";
import imageLazyLoading from "@/utils";

const SRC = {
  DISCORD: "https://discord.gg/RzvY6UyEes",
  TWITTER: "https://twitter.com/Bitcoin_Punks_",
  PUBLIC_DATA_SOURCE: "",
  ETH_CRYPTO_PUNKS: "",
  ORDINALS: "",
};

const SORT_TYPE = {
  RANDOM: 0,
  PUNK_ID: 1,
  RECENT_MINT: 2,
};
const OPTIONS = [
  {
    label: "Random",
    value: SORT_TYPE.RANDOM,
  },
  {
    label: "Punk ID",
    value: SORT_TYPE.PUNK_ID,
  },
  {
    label: "Recent Mint",
    value: SORT_TYPE.RECENT_MINT,
  },
];

const convertToString = (punkId: number) => {
  const str = "" + punkId;
  const PAD = "0000";
  const ans = PAD.substring(0, PAD.length - str.length) + str;
  return ans;
};

const getPunkImage = (punkId: number) => {
  return `https://cryptopunks.app/cryptopunks/cryptopunk${convertToString(
    punkId
  )}.png?size=2500&customColor=F7931A`;
};

// FIXME:
type OrdInfo = string;
type PunkInfo = {
  id: number;
  ords: Array<OrdInfo>;
};

const TOTAL = 10000;
const PER_PAGE = 20;

const isValidPunkId = (punkId: string) => {
  // empty
  if (punkId === "") return true;
  // number
  if (/^\d+$/.test(punkId) === false) return false;
  // valid number
  const n = parseInt(punkId);
  return 0 <= n && n < TOTAL;
};

const Home = () => {
  const [sortType, setSortType] = useState(SORT_TYPE.RANDOM);
  const [alwaysShowIds, setAlwaysShowIds] = useState(false);
  const [draftPunkId, setDraftPunkId] = useState("");
  const [punkId, setPunkId] = useState("");

  const [minted, setMinted] = useState<undefined | number>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [punkList, setPunkList] = useState<Array<PunkInfo>>([]);
  const [count, setCount] = useState(0);

  const punkListToBeShown = useMemo(() => {
    if (punkId !== "") {
      return punkList.filter((punk) => punk.id === parseInt(punkId));
    }

    if (sortType === SORT_TYPE.RANDOM) {
      return [...punkList]
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .filter((punk, idx) => idx < count - 1);
    } else if (sortType === SORT_TYPE.PUNK_ID) {
      return punkList.filter((punk) => punk.id < count - 1);
    } else {
      // FIXME: Recent Minted
      return punkList.filter((punk) => punk.id < count - 1);
    }
  }, [punkId, punkList, count, sortType]);

  const hasMore = useMemo(() => {
    if (punkList.length === 0) return false;
    return count < punkList.length;
  }, [punkList, count]);

  useEffect(() => {
    let isSubscribed = true;

    const initData = async () => {
      setIsLoading(true);
      try {
        const result = await new Promise<{
          punkList: Array<PunkInfo>;
          minted: number;
        }>((resolve) => {
          // FIXME:
          setTimeout(() => {
            resolve({
              punkList: new Array(TOTAL).fill(null).map((v, idx) => {
                return {
                  id: idx,
                  ords: [] as Array<OrdInfo>,
                };
              }),
              minted: 200,
            });
          }, 3000);
        });

        if (isSubscribed) {
          setMinted(result.minted);
          setPunkList(result.punkList);
          setCount(PER_PAGE);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(
          "Error",
          e instanceof Error ? JSON.stringify(e.message) : JSON.stringify(e)
        );
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    initData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    console.log(punkListToBeShown);
    imageLazyLoading();
  }, [punkListToBeShown]);

  return (
    <main className="box-border flex flex-1 flex-col items-center p-3 md:p-10">
      <div className="mb-5 flex w-full max-w-[600px] flex-col items-center sm:flex-row">
        {/* LOGO */}
        <div className="mx-5 my-3 h-[140px] w-[140px] overflow-hidden rounded-[70px] bg-[#f7931a]">
          <img
            className="block h-full w-full "
            alt="Bitcoin Punks Logo"
            src="/logo.png"
          ></img>
        </div>

        <div className="flex flex-col sm:ml-auto sm:mr-5">
          {/* Title */}
          <h1 className="text-[44px] leading-[44px]">
            Bitcoin Punks
            <div className="ml-2 inline-block">
              <a
                className="inline-block h-full w-10 text-center leading-[44px]"
                href={SRC.DISCORD}
              >
                <img
                  className="inline-block h-6 w-6"
                  alt="discord"
                  src="/discord-icon.svg"
                ></img>
              </a>
              <a
                className="inline-block h-full w-10 text-center leading-[44px]"
                href={SRC.TWITTER}
              >
                <img
                  className="inline-block h-6 w-6"
                  alt="discord"
                  src="/twitter-icon.svg"
                ></img>
              </a>
            </div>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl leading-10">
            The first 10k NFT collection on Bitcoin
          </h2>

          <div className="my-2 flex flex-row items-center">
            {/* Supply */}
            <h3
              className={classNames([
                "mr-3 text-[16px] font-medium",
                {
                  "text-[#f7931a]": minted === TOTAL,
                },
              ])}
            >
              {minted === undefined ? "..." : minted}
              {` / ${TOTAL} minted!`}
            </h3>
            {/* Verify Button */}
            <div>
              <button className="h-[34px] rounded bg-[#70c0e8] px-[14px] text-sm text-black hover:cursor-pointer hover:bg-[#98cae9]">
                Verified listings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description 1 */}
      <p className="max-w-[600px] text-center text-sm">
        Bitcoin Punks are the first byte-perfect uploads of the{" "}
        <a
          href={SRC.ETH_CRYPTO_PUNKS}
          className="inline text-[#f7931a] hover:cursor-pointer hover:underline"
        >
          original Ethereum CryptoPunks
        </a>{" "}
        onto the Bitcoin Blockchain using{" "}
        <a
          href={SRC.ORDINALS}
          className="inline text-[#f7931a] hover:cursor-pointer hover:underline"
        >
          Ordinals
        </a>
        . Active Bitcoin Punk holders operate the website, Twitter and Discord
        to proliferate the story of Bitcoin Punks.
      </p>

      <br />

      {/* Description 2 */}
      <p className="max-w-[600px] text-center text-sm">
        To make this site, we are checking the hash of every image uploaded to
        Ordinals and comparing it against the original 10k punk images. The
        links to Bitcoin Punks are the first-seen inscriptions (lowest ID) that
        contain these hashes on Ordinals.
      </p>

      <div className="my-8 w-full max-w-[600px] border-b-[1px] border-solid border-[#555]"></div>

      {/* Info */}
      <div
        className={classNames([
          "relative mb-8 box-border flex w-full max-w-[600px] flex-row flex-nowrap rounded border-[1px] border-[#3889c5]/[.35] bg-[#3889c5]/25 py-3 pl-11 pr-3",
          {
            hidden: isLoading,
          },
        ])}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 28"
          version="1.1"
          fill="#3889c5"
          className="absolute left-3 top-4 h-6 w-6 shrink-0 stroke-info"
        >
          <g stroke="none" strokeWidth="1" fillRule="evenodd">
            <g fillRule="nonzero">
              <path d="M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"></path>
            </g>
          </g>
        </svg>
        <div className="flex-1 text-left text-sm font-normal text-white">
          We are now kicking off a community review of the inscription set for
          the collection. Everybody is encouraged to inspect{" "}
          <a
            href={SRC.PUBLIC_DATA_SOURCE}
            className="inline font-medium hover:cursor-pointer hover:underline"
          >
            the public data source
          </a>{" "}
          and use the tools on this page to verify that the inscriptions are
          correct for each punk.
          <br />
          <br />
          Please report any discrepancies via{" "}
          <a
            href={SRC.DISCORD}
            className="inline text-[#f7931a] hover:cursor-pointer hover:underline"
          >
            Discord
          </a>
          !
        </div>
      </div>

      {/* View Button */}
      <div
        className={classNames([
          "mb-6",
          {
            hidden: isLoading,
          },
        ])}
      >
        <button className="h-[34px] rounded bg-white/[.08] px-[14px] text-sm text-[#b5b5b5] hover:cursor-pointer hover:bg-transparent">
          View your punks
        </button>
      </div>

      <div className="mb-5 flex w-full max-w-[1000px] flex-row flex-wrap items-center justify-center justify-around">
        {/* Sort */}
        <div className="mt-5 flex w-[340px] flex-row flex-nowrap items-center justify-between lg:w-[355px]">
          <div>Sort by: </div>
          <ButtonGroup
            options={OPTIONS}
            value={sortType}
            onChange={(v) => {
              setSortType(v);
            }}
          />
        </div>

        {/* Search */}
        <div className="mt-5 flex w-[375px] flex-row flex-nowrap justify-between lg:w-[355px]">
          <div
            className="flex w-[140px] flex-row flex-nowrap items-center hover:cursor-pointer"
            onClick={() => {
              setAlwaysShowIds(!alwaysShowIds);
            }}
          >
            <Checkbox value={alwaysShowIds} />
            <span className="ml-3 inline-block text-sm font-normal text-white/[.82]">
              Always show IDs
            </span>
          </div>
          <div className="flex h-[28px] w-[160px]">
            <IdInput
              value={draftPunkId}
              onChange={(e) => {
                setDraftPunkId(e.target.value);
              }}
              className={classNames({
                "line-through": !isValidPunkId(draftPunkId),
              })}
            />
          </div>
          <div>
            <button
              onClick={() => {
                if (draftPunkId !== "") {
                  setPunkId(
                    isValidPunkId(draftPunkId) ? draftPunkId : TOTAL - 1 + ""
                  );
                  setDraftPunkId("");
                }
              }}
              className="box-content h-7 w-7 rounded-sm bg-[#70c0e8]/[.16] px-2 text-[#70c0e8] hover:bg-[#70c0e8]/[.2]"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* Loading Data */}
      <div
        className={classNames([
          "mt-6",
          {
            hidden: !isLoading,
          },
        ])}
      >
        <div className="box-content h-8 rounded-sm border-[1px] border-white/[.25] px-3 text-sm leading-8 text-white/[.25]">
          Loading data ...
        </div>
      </div>

      {/* List */}
      <div className="mt-6 w-full max-w-7xl">
        <div className="flex w-full flex-row flex-wrap items-center justify-center">
          {punkListToBeShown.map(({ id }) => {
            return (
              <div
                className="lazy-image-container group relative h-24 w-24 bg-[#F7931A]"
                data-src={getPunkImage(id)}
                key={convertToString(id)}
              >
                {/* Lazy Load Image */}
                <div
                  className={classNames([
                    "invisible absolute left-0 top-0 h-4 w-24 bg-black/[.5] text-center text-xs font-normal text-white group-hover:!visible",
                    {
                      "!visible": alwaysShowIds,
                    },
                  ])}
                >{`#${convertToString(id)}`}</div>
                <div className="invisible absolute bottom-0 left-0 flex h-4 w-24 flex-row flex-nowrap bg-black/[.5] group-hover:!visible">
                  <button className="w-1/2 text-center text-xs font-normal text-[#f7931a] hover:underline">
                    ORDS
                  </button>
                  <a
                    className="w-1/2 text-center text-xs font-normal text-[#f7931a] hover:underline"
                    href={getPunkImage(id)}
                    target="_blank"
                  >
                    FPF
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Load More Button */}
      <div
        className={classNames([
          "mt-6",
          {
            hidden: !hasMore || punkId !== "",
          },
        ])}
      >
        <button
          onClick={() => {
            const nextShowPunks = count + PER_PAGE;
            setCount(
              nextShowPunks > punkList.length ? punkList.length : nextShowPunks
            );
          }}
          className="h-[34px] rounded bg-white/[.08] px-[14px] text-sm text-[#f7931a] hover:cursor-pointer hover:bg-white/[.18]"
        >
          Load more
        </button>
      </div>

      {/* Clear Filter */}
      <div
        className={classNames([
          "mt-6",
          {
            hidden: punkId === "",
          },
        ])}
      >
        <button
          onClick={() => {
            setPunkId("");
          }}
          className="h-7 rounded bg-[#f7931a] px-2 text-sm text-black hover:cursor-pointer hover:bg-[#f7931a]/[.9]"
        >
          Clear Filter
        </button>
      </div>
    </main>
  );
};

export default Home;
