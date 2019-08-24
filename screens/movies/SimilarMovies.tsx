import React, { useEffect, FC } from 'react';
import { Section } from '../../components/section/Section';
import { Instance, cast } from 'mobx-state-tree';
import { useObserver } from 'mobx-react-lite';
import { SectionMediaItem } from '../../components/section/SectionMediaItem';
import { AnyMedia } from '../../store/media/AnyMedia';

export interface SimilarMediaProps {
  media: Instance<typeof AnyMedia>;
}

export const SimilarMedia: FC<SimilarMediaProps> = ({ media }) => {
  useEffect(() => {
    media.fetchSimilar().catch(e => {
      console.warn(e.message);
    });
  }, [media]);

  return useObserver(
    () =>
      media.similar.length > 0 && (
        <Section title="Similar">
          {media.similar.map(m => (
            <SectionMediaItem key={m.id} media={m} />
          ))}
        </Section>
      )
  );
};
