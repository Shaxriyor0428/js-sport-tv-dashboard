import { IconProps } from "@/types";

export const ResultsIcon = (props: IconProps) => (
  <svg
    width={17}
    height={17}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-[17px] h-[17px] block mx-auto my-auto group-hover:text-white transition-colors duration-200 ${
      props.active ? "text-white" : "text-[#393F5F]"
    }`}
    {...props}
  >
    <path
      d="M7.33333 4.58331H3.66667C3.16041 4.58331 2.75 4.99372 2.75 5.49998V9.16665C2.75 9.67291 3.16041 10.0833 3.66667 10.0833H7.33333C7.83959 10.0833 8.25 9.67291 8.25 9.16665V5.49998C8.25 4.99372 7.83959 4.58331 7.33333 4.58331Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.75 15.5833L4.58333 17.4167L8.25 13.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.917 5.5H19.2503"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.917 11H19.2503"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.917 16.5H19.2503"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ResultsIcon;
