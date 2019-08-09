import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import styled from 'styled-components/native';
import { NavigationEvents } from 'react-navigation';
import { MovieListSection } from './MovieListSection';
import { StyleSheet } from 'react-native';
import { MovieLists } from '../../api';
import { useStores } from '../../store/StoreContext';

const StyledFab = styled(FAB).attrs(props => ({
  color: props.theme.colors.text
}))`
  position: absolute;
  bottom: 50px;
  right: 0;
  margin: 16px;
  background: ${props => props.theme.colors.primary};
`;

const StyledScrollView = styled(ScrollView).attrs({
  contentContainerStyle: { padding: 10 }
})`
  background: ${props => props.theme.colors.background};
  flex-grow: 1;
`;

const styles = StyleSheet.create({
  list: {
    marginBottom: 10
  }
});

const Lists: { [type in MovieLists]?: string } = {
  popular: 'Popular',
  toprated: 'Top rated',
  upcoming: 'Upcoming'
};

export const MoviesScreen = ({ navigation }) => {
  const [active, setActive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onSearch = useCallback(() => active && navigation.navigate('Search'), [
    active,
    navigation
  ]);

  const { lists } = useStores();

  const refreshLists = useCallback(() => {
    setRefreshing(true);

    Promise.all(
      Object.keys(Lists).map((l: MovieLists) => lists.fetchMovieList(l))
    ).finally(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <>
      <StyledScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshLists} />
        }>
        {Object.keys(Lists).map((type: MovieLists) => {
          const label = Lists[type];

          return (
            <MovieListSection
              key={type}
              title={label}
              list={type}
              style={styles.list}
              navigation={navigation}
            />
          );
        })}
      </StyledScrollView>
      <NavigationEvents
        onDidFocus={() => setActive(true)}
        onWillBlur={() => setActive(false)}
      />
      <Portal>
        <StyledFab
          icon="search"
          onPress={onSearch}
          accessibilityLabel="Search"
          visible={active}
        />
      </Portal>
    </>
  );
};

MoviesScreen.navigationOptions = {
  title: 'Movies'
};
