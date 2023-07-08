import classNames from "classnames";
import { ChangeEvent, HTMLAttributes } from "react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: HTMLAttributes<HTMLInputElement>["className"];
};
const IdInput = ({ value, onChange, className }: Props) => {
  return (
    <input
      type="text"
      className={classNames([
        "h-full w-full rounded-sm bg-[#fffefd]/[.1] text-center text-sm font-normal text-white caret-[#f7931a] outline-none focus:bg-[#f7931a]/[.1]",
        className,
      ])}
      placeholder="Find Punk ID"
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
};

export default IdInput;
