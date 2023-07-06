import { useMemo, useState } from "react";
import classNames from "classnames";
import ButtonGroup from "../ButtonGroup";
import Checkbox from "../Checkbox";
import IdInput from "../IdInput";

const SRC = {
  DISCORD: "https://discord.gg/RzvY6UyEes",
  TWITTER: "https://twitter.com/Bitcoin_Punks_",
  PUBLIC_DATA_SOURCE: "",
  ETH_CRYPTO_PUNKS: "",
  ORDINALS: "",
};

const options = [
  {
    label: "Random",
    value: 0,
  },
  {
    label: "Punk ID",
    value: 1,
  },
  {
    label: "Recent Mint",
    value: 2,
  },
];

const TOTAL = 10000;

const Home = () => {
  const [sortType, setSortType] = useState(0);
  const [alwaysShowIds, setAlwaysShowIds] = useState(false);
  const [punkId, setPunkId] = useState("");
  const validPunkId = useMemo(() => {
    // empty
    if (punkId === "") return true;
    // number
    if (/^\d+$/.test(punkId) === false) return false;
    // valid number
    const n = parseInt(punkId);
    return 0 <= n && n < TOTAL;
  }, [punkId]);

  return (
    <main className="box-border flex max-w-screen-xl flex-col">
      {/* LOGO */}
      <div className="m-2 h-[140px] w-[140px] overflow-hidden rounded-[70px] bg-[#f7931a]">
        <img
          className="block h-full w-full "
          alt="Bitcoin Punks Logo"
          src="/logo.png"
        ></img>
      </div>

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

      {/* Supply */}
      <h3 className="text-[16px] font-medium text-[#f7931a]">
        10000 / 10000 minted!
      </h3>

      {/* Verify Button */}
      <div>
        <button className="h-[34px] rounded bg-[#70c0e8] px-[14px] text-sm text-black hover:cursor-pointer hover:bg-[#98cae9]">
          Verified listings
        </button>
      </div>

      {/* Description 1 */}
      <p className="text-center text-sm">
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
      <p className="text-center text-sm">
        To make this site, we are checking the hash of every image uploaded to
        Ordinals and comparing it against the original 10k punk images. The
        links to Bitcoin Punks are the first-seen inscriptions (lowest ID) that
        contain these hashes on Ordinals.
      </p>

      {/* Info */}
      <div className="relative box-border flex max-w-xl flex-row flex-nowrap rounded border-[1px] border-[#3889c5]/[.35] bg-[#3889c5]/25 py-3 pl-11 pr-3">
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
      <div>
        <button className="h-[34px] rounded bg-white/[.08] px-[14px] text-sm text-[#b5b5b5] hover:cursor-pointer hover:bg-transparent">
          View your punks
        </button>
      </div>

      {/* Sort */}
      <div className="flex w-[355px] flex-row flex-nowrap items-center justify-between">
        <div>Sort by: </div>
        <ButtonGroup
          options={options}
          value={sortType}
          onChange={(v) => {
            setSortType(v);
          }}
        />
      </div>

      {/* Search */}
      <div className="flex w-[355px] flex-row flex-nowrap justify-between">
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
            value={punkId}
            onChange={(e) => {
              setPunkId(e.target.value);
            }}
            className={classNames({
              "line-through": !validPunkId,
            })}
          />
        </div>
        <div>
          <button className="box-content h-7 w-7 rounded-[2px] bg-[#70c0e8]/[.16] px-2 text-[#70c0e8] hover:bg-[#70c0e8]/[.2]">
            Go
          </button>
        </div>
      </div>

      {/* List */}
      {/* Load More */}
    </main>
  );
};

export default Home;
