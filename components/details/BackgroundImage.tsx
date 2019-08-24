import React, { FC } from 'react';
import { Instance } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import { ScaledResponsiveImage } from '../ScaledImage';
import observableDimensions, {
  Orientation
} from '../../utils/observableDimensions';
import { AnyMedia } from '../../store/media/AnyMedia';
import { BackdropSizes } from '../../types/ImageSizes';

export interface BackgroundImageProps {
  media: Instance<typeof AnyMedia>;
}

export const BackgroundImage: FC<BackgroundImageProps> = observer(
  ({ media }) => (
    <ScaledResponsiveImage
      sources={{
        1: {
          uri: media.backdrop(BackdropSizes.w300)
        },
        2: {
          uri: media.backdrop(BackdropSizes.w780)
        },
        3: {
          uri: media.backdrop(BackdropSizes.w1280)
        }
      }}
      preferredPixelRatio={
        observableDimensions.orientation === Orientation.landscape
          ? 3
          : undefined
      }
      style={{ backgroundColor: '#00000080' }}
      width={observableDimensions.width}
      ratio={9 / 16}
      resizeMode="cover"
    />
  )
);
