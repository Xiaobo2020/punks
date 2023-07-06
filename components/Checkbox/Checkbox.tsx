import classNames from "classnames";

type Props = {
  value: boolean;
  onChange?: (value: boolean) => void;
};

function Checkbox({ value }: Props) {
  return (
    <span
      className={classNames([
        "box-content inline-block h-[14px] w-[14px] rounded-[2px] border-[1px] border-white/[.25]",
        {
          "!border-[#f7931a]": value,
          "bg-[#f7931a]": value,
        },
      ])}
    >
      <svg
        viewBox="0 0 64 64"
        className={classNames([
          "text-[#18181c]",
          {
            invisible: !value,
          },
        ])}
      >
        <path d="M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"></path>
      </svg>
    </span>
  );
}

export default Checkbox;
