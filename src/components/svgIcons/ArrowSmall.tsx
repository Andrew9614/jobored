type ArrowSmallType = {
  direction: 'up' | 'down';
};

export const ArrowSmall = ({ direction }: ArrowSmallType) => {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${direction === 'up' ? '180deg' : 0})` }}
    >
      <path
        d="M1.49994 1.5L4.60946 4.16531C4.83416 4.3579 5.16572 4.3579 5.39041 4.16531L8.49994 1.5"
        stroke="#ACADB9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
