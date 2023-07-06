import classNames from "classnames";

type OptionItem<T = string> = {
  label: string;
  value: T;
};
type Props<T = string> = {
  options: OptionItem<T>[];
  value: T;
  onChange: (value: T) => void;
};

function ButtonGroup<T = string>({ options, value, onChange }: Props<T>) {
  if (!Array.isArray(options) || !(options.length > 0)) {
    return null;
  }
  return (
    <div>
      {options.map(({ label, value: curValue }, curIndex) => (
        <button
          key={curIndex}
          onClick={() => {
            onChange(curValue);
          }}
          className={classNames([
            "inline-block h-[34px] border-[1px] border-white/[.25] px-[14px] text-center text-sm font-normal leading-[32px] text-white/[.82] hover:cursor-pointer hover:border-[#f7931a] hover:bg-[#f7931a]/[.2] hover:text-[#f7931a]",
            {
              "ml-[-1px]": curIndex > 0,
              "rounded-l-[3px]": curIndex === 0,
              "rounded-r-[3px]": curIndex === options.length - 1,
              "!border-[#f7931a] !bg-[#f7931a]/[.2] !text-[#f7931a]":
                curValue === value,
            },
          ])}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;
