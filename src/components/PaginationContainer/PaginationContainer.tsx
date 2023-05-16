import { Pagination, PaginationProps } from '@mantine/core';
import { JOB_PER_PAGE, TOTAL_LIMIT } from '../../globalVars/settings';

type PaginationContainerType = {
  paginationProps: Omit<PaginationProps, 'total'>;
  length: number | undefined;
  className?: string;
};

export const PaginationContainer = ({
  paginationProps,
  length,
  className,
}: PaginationContainerType) => {
  return (
    <>
      {length && length > JOB_PER_PAGE ? (
        <div className={className}>
          <Pagination
            {...paginationProps}
            total={
              length < TOTAL_LIMIT
                ? Math.ceil(length / JOB_PER_PAGE)
                : Math.ceil(TOTAL_LIMIT / JOB_PER_PAGE)
            }
          />
        </div>
      ) : (
        <div style={{ height: '20px' }}></div>
      )}
    </>
  );
};
