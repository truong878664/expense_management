import classNames from "classnames";
export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}
type Button = {
  children: string | HTMLElement;
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;
function Button({ children, className, ...rest }: Button) {
  return (
    <button
      {...rest}
      className={classNames(
        "w-full max-w-md rounded-2xl bg-gray-200 py-4 text-center font-bold text-sky-600 shadow-md shadow-gray-600/20 last:mt-4",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
