import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import ButtonGroup from "../ButtonGroup";
import Checkbox from "../Checkbox";
import IdInput from "../IdInput";
import {
  getFullPunkId,
  getPunkImageSrc,
  getPunkList,
  imageLazyLoading,
  isValidPunkId,
} from "@/utils";
import { PunkInfo } from "@/types";
import {
  LINK_HREF,
  PER_PAGE,
  SORT_OPTIONS,
  SORT_TYPE,
  TOTAL_SUPPLY,
} from "@/constants";

const Home = () => {
  const [sortType, setSortType] = useState(SORT_TYPE.RANDOM);
  const [alwaysShowIds, setAlwaysShowIds] = useState(false);
  const [draftPunkId, setDraftPunkId] = useState("");
  const [filteredPunkId, setFilteredPunkId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPunkList, setTotalPunkList] = useState<Array<PunkInfo>>([]);
  const [mintedCount, setMintedCount] = useState<undefined | number>(undefined);
  const [shownCount, setShownCount] = useState(0);

  const shownPunkList = useMemo(() => {
    if (sortType === SORT_TYPE.RANDOM) {
      return [...totalPunkList]
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
        .filter((punk, idx) => idx < shownCount - 1);
    } else if (sortType === SORT_TYPE.PUNK_ID) {
      return totalPunkList.filter((punk) => punk.id < shownCount - 1);
    } else {
      // TODO: Recent minted punk info
      return totalPunkList.filter((punk) => punk.id < shownCount - 1);
    }
  }, [totalPunkList, shownCount, sortType]);

  const filteredPunkList = useMemo(() => {
    if (filteredPunkId !== "") {
      return totalPunkList.filter(
        (punk) => punk.id === parseInt(filteredPunkId)
      );
    }
    return [];
  }, [filteredPunkId, totalPunkList]);

  const hasMore = useMemo(() => {
    if (totalPunkList.length === 0) return false;
    return shownCount < totalPunkList.length;
  }, [totalPunkList, shownCount]);

  useEffect(() => {
    let isSubscribed = true;

    const initData = async () => {
      setIsLoading(true);
      try {
        const result = await getPunkList();

        if (isSubscribed) {
          setMintedCount(result.minted);
          setTotalPunkList(result.punkList);
          setShownCount(PER_PAGE);
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
    if (filteredPunkList.length > 0 && filteredPunkId !== "") {
      imageLazyLoading();
    }
  }, [filteredPunkId, filteredPunkList]);

  useEffect(() => {
    if (filteredPunkId === "") {
      imageLazyLoading();
    }
  }, [sortType, filteredPunkId, shownPunkList]);

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
                href={LINK_HREF.DISCORD}
              >
                <img
                  className="inline-block h-6 w-6"
                  alt="discord"
                  src="/discord-icon.svg"
                ></img>
              </a>
              <a
                className="inline-block h-full w-10 text-center leading-[44px]"
                href={LINK_HREF.TWITTER}
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
                  "text-[#f7931a]": mintedCount === TOTAL_SUPPLY,
                },
              ])}
            >
              {mintedCount === undefined ? "..." : mintedCount}
              {` / ${TOTAL_SUPPLY} minted!`}
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
          href={LINK_HREF.ETH_CRYPTO_PUNKS}
          className="inline text-[#f7931a] hover:cursor-pointer hover:underline"
        >
          original Ethereum CryptoPunks
        </a>{" "}
        onto the Bitcoin Blockchain using{" "}
        <a
          href={LINK_HREF.ORDINALS}
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
            href={LINK_HREF.PUBLIC_DATA_SOURCE}
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
            href={LINK_HREF.DISCORD}
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
            options={SORT_OPTIONS}
            value={sortType}
            onChange={(v) => {
              setSortType(v);
            }}
          />
        </div>

        {/* Search */}
        <div
          className={classNames([
            "mt-5 flex w-[375px] flex-row flex-nowrap justify-between lg:w-[355px]",
            {
              hidden: filteredPunkId !== "",
            },
          ])}
        >
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
                  const isValid = isValidPunkId(draftPunkId);
                  if (isValid) {
                    setFilteredPunkId(draftPunkId);
                  } else {
                    const nextDraftPunkId = TOTAL_SUPPLY - 1 + "";
                    setDraftPunkId(nextDraftPunkId);
                    setTimeout(() => {
                      setFilteredPunkId(nextDraftPunkId);
                    }, 0);
                  }
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
          {(filteredPunkId !== "" ? filteredPunkList : shownPunkList).map(
            ({ id }) => {
              return (
                <div
                  className="lazy-image-container group relative h-24 w-24 bg-[#F7931A]"
                  data-src={getPunkImageSrc(id)}
                  key={getFullPunkId(id)}
                >
                  {/* Lazy Load Image */}
                  <div
                    className={classNames([
                      "invisible absolute left-0 top-0 h-4 w-24 bg-black/[.5] text-center text-xs font-normal text-white group-hover:!visible",
                      {
                        "!visible": alwaysShowIds,
                      },
                    ])}
                  >{`#${getFullPunkId(id)}`}</div>
                  <div className="invisible absolute bottom-0 left-0 flex h-4 w-24 flex-row flex-nowrap bg-black/[.5] group-hover:!visible">
                    <button className="w-1/2 text-center text-xs font-normal text-[#f7931a] hover:underline">
                      ORDS
                    </button>
                    <a
                      className="w-1/2 text-center text-xs font-normal text-[#f7931a] hover:underline"
                      href={getPunkImageSrc(id)}
                      target="_blank"
                    >
                      FPF
                    </a>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Load More Button */}
      <div
        className={classNames([
          "mt-6",
          {
            hidden: !hasMore || filteredPunkId !== "",
          },
        ])}
      >
        <button
          onClick={() => {
            const nextShowPunks = shownCount + PER_PAGE;
            setShownCount(
              nextShowPunks > totalPunkList.length
                ? totalPunkList.length
                : nextShowPunks
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
            hidden: filteredPunkId === "",
          },
        ])}
      >
        <button
          onClick={() => {
            setFilteredPunkId("");
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
