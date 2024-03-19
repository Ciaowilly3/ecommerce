import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { COLORS } from '../../constants';

interface IRatingProps {
  rating: number;
}

const Rating = ({ rating }: IRatingProps) => {
  const decimal = rating - Math.floor(rating);

  const createStars = useMemo(() => {
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
  return createStars;
};

//TODO: cercare metodo migliore

export default Rating;
