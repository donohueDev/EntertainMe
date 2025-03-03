// component from secondary library to create star rating template 
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Rating } from 'react-native-ratings';

const GameRating = () => {
  // use state to allow changes to rating value
  const [rating, setRating] = useState(0);

  // set rating on rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log('User rated the game:', newRating);
  };

  // react native code to be used in main app functionality 
  return (
    <View>
      <Text>Rate this Game</Text>
      <Rating
        showRating
        onFinishRating={handleRatingChange}
        style={{ paddingVertical: 10 }}
        ratingCount={5}
        imageSize={30}
        startingValue={rating}
        fractions={1}  // Allows half-star ratings
      />
    </View>
  );
};

export default GameRating;
