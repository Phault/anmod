import React, { useEffect, FC, memo, useState, useCallback } from 'react';
import { Text } from 'react-native-paper';
import { MovieLists, api } from '../../api';
import { NavigationInjectedProps } from 'react-navigation';
import { SectionProps, Section } from '../../components/Section';
import { useStores } from '../../store/StoreContext';
import { useObserver } from 'mobx-react-lite';
import { SectionMovieItem } from '../../components/SectionMovieItem';
import { LoadingSectionItem } from '../../components/LoadingSectionItem';

const OneDay = 1000 * 60 * 60 * 24;

export interface MovieListSectionProps
  extends SectionProps,
    NavigationInjectedProps {
  list: MovieLists;
}

export const MovieListSection: FC<MovieListSectionProps> = memo(
  ({ list, navigation, ...rest }) => {
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { lists } = useStores();

    const refreshList = useCallback(() => {
      setFetching(true);
      setError(null);

      lists
        .fetchMovieList(list)
        .catch(e => {
          setError(e.message);
        })
        .finally(() => {
          setFetching(false);
        });
    }, []);

    useEffect(() => {
      const movieList = lists.movies.get(list);
      if (!movieList || movieList.lastUpdated.getTime() < Date.now() - OneDay)
        refreshList();
    }, []);

    return useObserver(() => {
      const movieList = lists.movies.get(list);

      let items;

      if (error) {
        items = <Text>{JSON.stringify(error)}</Text>;
      } else if (!movieList) {
        items = <LoadingSectionItem />;
      } else {
        items = movieList.items.map(movie => (
          <SectionMovieItem key={movie.id} movie={movie} />
        ));
      }

      return <Section {...rest}>{items}</Section>;
    });
  }
);
