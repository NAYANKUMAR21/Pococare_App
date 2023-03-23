import { SimpleGrid } from '@chakra-ui/react';
import { Children, isValidElement, useMemo } from 'react';

export const ProductGrid = (props) => {
  const columns = useMemo(() => {
    const count = Children.toArray(props.children).filter(
      isValidElement
    ).length;
    return {
      base: Math.min(1, count),
      md: Math.min(2, count),
      lg: Math.min(3, count),
      xl: Math.min(4, count),
    };
  }, [props.children]);
  return (
    <SimpleGrid
      columns={columns}
      columnGap={{
        base: '10',
        md: '10',
      }}
      rowGap={{
        base: '10',
        md: '10',
      }}
      {...props}
    />
  );
};
