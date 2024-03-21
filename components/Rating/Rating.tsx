import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { COLORS } from '../../constants';

interface IRatingProps {
  rating: number;
}

const Rating = ({ rating }: IRatingProps) => {
  const createStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      let name = 'star-o';
      if (rating > index + 1) name = 'star';
      else if (rating - Math.floor(rating) > 0.49) name = 'star-half-o';
      return (
        <FontAwesome
          key={index}
          name={name as never}
          size={24}
          color={COLORS.yellow}
        />
      );
    });
  }, [rating]);
  return createStars;
};

export default Rating;
