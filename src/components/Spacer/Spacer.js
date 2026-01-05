import React from 'react';
import { View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';
const Spacer = ({ height, width }) => {

  let finalHeight = 0;
  let finalWidth = 0;
  if (height) {
    if (typeof height === 'number') {
      finalHeight = verticalScale(height);
    } else if (typeof height === 'string') {
        finalHeight = hp(height); 
    } else {
        finalHeight = height;
    }
  }
  if (width) {
    if (typeof width === 'string') {
      finalWidth = wp(width);
    } else {
      finalWidth = width;
    }
  }
  
  return <View style={{ height: finalHeight, width: finalWidth }} />;
};

export default Spacer;
