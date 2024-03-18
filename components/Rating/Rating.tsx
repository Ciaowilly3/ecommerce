import { FontAwesome } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { COLORS } from '../../constants';

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  const decimal = rating - Math.floor(rating);

  const createStars = useCallback(() => {
    const star = [];
    let name = '';
    for (let i = 1; i < 6; i++) {
      if (rating > i) name = 'star';
      else if (decimal > 0.49) name = 'star-half-o';
      else name = 'star-o';
      star.push(
        <FontAwesome
          key={i}
          name={name as never}
          size={24}
          color={COLORS.yellow}
        />
      );
    }
    return star;
  }, [rating]);
  return createStars();
};

export default Rating;
