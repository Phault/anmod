import React from 'react';
import styled from 'styled-components/native';
import ResponsiveImage from '@expo/react-native-responsive-image';
import FastImage from 'react-native-fast-image';

export interface ScaledImageProps {
  width?: number;
  height?: number;
  ratio?: number;
}

export const ScaledImage = styled(FastImage)<ScaledImageProps>`
  width: ${props => props.width || props.height / props.ratio}px;
  height: ${props => props.height || props.width * props.ratio}px;
`;

ScaledImage.defaultProps = {
  ratio: 1.5
};

export const FastResponsiveImage = props => (
  <ResponsiveImage
    {...props}
    renderImageElement={props => <FastImage {...props} />}
  />
);

export const ScaledResponsiveImage = styled(FastResponsiveImage)<
  ScaledImageProps
>`
  width: ${props => props.width || props.height / props.ratio}px;
  height: ${props => props.height || props.width * props.ratio}px;
`;

ScaledResponsiveImage.defaultProps = {
  ratio: 1.5
};
