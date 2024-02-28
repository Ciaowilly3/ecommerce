import React from 'react';
import { Text, View } from 'react-native';
import { IProduct } from '../../Interfaces/IProducts';

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  );
};

export default ProductCard;
