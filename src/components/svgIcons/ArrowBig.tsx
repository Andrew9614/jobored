type ArrowBigType = {
  direction: 'up' | 'down';
};

export const ArrowBig = ({ direction }: ArrowBigType) => {
  return (
    <svg
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${direction === 'up' ? '180deg' : 0})`,
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
    >
      <path
        d="M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1"
        stroke="#ACADB9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
