const Home = () => {
  return (
    <main className="box-border flex max-w-screen-xl flex-col">
      <div className="m-2 h-[140px] w-[140px] rounded-[70px] bg-[#f7931a]">
        <img
          className="block h-full w-full "
          alt="Bitcoin Punks Logo"
          src="https://ord.ordinals.market/content/c43b26851e509d46a91223a01b6e22ec21a9d31432e02d571ebfa918f4048c0ci0"
        ></img>
      </div>
      <h1 className="text-[44px] leading-[44px]">
        Bitcoin Punks
        <div className="ml-2 inline-block">
          <a
            className="inline-block h-full w-10 text-center leading-[44px]"
            href="https://discord.gg/RzvY6UyEes"
          >
            <img
              className="inline-block h-6 w-6"
              alt="discord"
              src="/discord-icon.svg"
            ></img>
          </a>
          <a
            className="inline-block h-full w-10 text-center leading-[44px]"
            href="https://twitter.com/Bitcoin_Punks_"
          >
            <img
              className="inline-block h-6 w-6"
              alt="discord"
              src="/twitter-icon.svg"
            ></img>
          </a>
        </div>
      </h1>
      <h2 className="text-xl leading-10">
        The first 10k NFT collection on Bitcoin
      </h2>
      <h3 className="text-[16px] font-medium text-[#f7931a]">
        10000 / 10000 minted!
      </h3>
      <div>
        <button className="btn-info btn-sm btn h-9 rounded font-normal">
          Verified listings
        </button>
      </div>
      <div>
        Bitcoin Punks are the first byte-perfect uploads of the original
        Ethereum CryptoPunks onto the Bitcoin Blockchain using Ordinals. Active
        Bitcoin Punk holders operate the website, Twitter and Discord to
        proliferate the story of Bitcoin Punks.
      </div>
      <div>
        To make this site, we are checking the hash of every image uploaded to
        Ordinals and comparing it against the original 10k punk images. The
        links to Bitcoin Punks are the first-seen inscriptions (lowest ID) that
        contain these hashes on Ordinals.
      </div>
      <div>line</div>
      <div>info</div>
    </main>
  );
};

export default Home;
