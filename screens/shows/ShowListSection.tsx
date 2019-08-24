import React, { useEffect, FC, memo, useState, useCallback } from 'react';
import { Text } from 'react-native-paper';
import { ShowLists } from '../../api';
import { NavigationInjectedProps } from 'react-navigation';
import { SectionProps, Section } from '../../components/section/Section';
import { useStores } from '../../store/StoreContext';
import { useObserver } from 'mobx-react-lite';
import { LoadingSectionItem } from '../../components/section/LoadingSectionItem';
import { SectionMediaItem } from '../../components/section/SectionMediaItem';

const OneDay = 1000 * 60 * 60 * 24;

export interface ShowListSectionProps
  extends SectionProps,
    NavigationInjectedProps {
  list: ShowLists;
}

export const ShowListSection: FC<ShowListSectionProps> = memo(
  ({ list, navigation, ...rest }) => {
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { lists } = useStores();

    const refreshList = useCallback(() => {
      setFetching(true);
      setError(null);

      lists
        .fetchShowList(list)
        .catch(e => {
          console.warn(e);
          setError(e.message);
        })
        .finally(() => {
          setFetching(false);
        });
    }, []);

    useEffect(() => {
      const showList = lists.shows.get(list);
      if (!showList || showList.lastUpdated.getTime() < Date.now() - OneDay)
        refreshList();
    }, []);

    return useObserver(() => {
      const showList = lists.shows.get(list);

      let items;

      if (error) {
        items = <Text>{JSON.stringify(error)}</Text>;
      } else if (!showList) {
        items = <LoadingSectionItem />;
      } else {
        items = showList.items.map(show => (
          <SectionMediaItem key={show.id} media={show} />
        ));
      }

      return <Section {...rest}>{items}</Section>;
    });
  }
);
