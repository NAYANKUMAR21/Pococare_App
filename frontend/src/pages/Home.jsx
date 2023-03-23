import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/Products/product.actions';
import { refreshToken } from '../redux/auth/auth.action';

import Navbar from './Navbar';
import { ProductGrid } from '../Cards/ProductGrid';
import { ProductCard } from '../Cards/ProductCard';
import { Box, Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts()).then((res) => {
      dispatch(refreshToken());
    });
  }, []);
  if (state.loading) {
    return (
      <Text fontSize="4xl" textAlign="center" mt="250px">
        ...Loading
      </Text>
    );
  }
  return (
    <>
      <Navbar />
      <Box
        maxW="7xl"
        mx="auto"
        px={{
          base: '4',
          md: '8',
          lg: '12',
        }}
        py={{
          base: '6',
          md: '8',
          lg: '12',
        }}
      >
        <ProductGrid>
          {state?.data?.map((product, index) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductGrid>
      </Box>
    </>
  );
};

export default Home;
