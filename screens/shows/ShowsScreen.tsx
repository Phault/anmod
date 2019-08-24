import React, { useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import { ShowLists } from '../../api';
import { useStores } from '../../store/StoreContext';
import { ShowListSection } from './ShowListSection';
import { NavigationAwareFAB } from '../../components/NavigationAwareFAB';

export const StyledFab = styled(NavigationAwareFAB).attrs(props => ({
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

const Lists: { [type in ShowLists]?: string } = {
  popular: 'Popular',
  trending: 'Trending',
  anticipated: 'Anticipated'
};

export const ShowsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onSearch = useCallback(() => navigation.navigate('Search'), [
    navigation
  ]);

  const { lists } = useStores();

  const refreshLists = useCallback(() => {
    setRefreshing(true);

    Promise.all(
      Object.keys(Lists).map((l: ShowLists) => lists.fetchShowList(l))
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
        {Object.keys(Lists).map((type: ShowLists) => {
          const label = Lists[type];

          return (
            <ShowListSection
              key={type}
              title={label}
              list={type}
              style={styles.list}
              navigation={navigation}
            />
          );
        })}
      </StyledScrollView>
      <StyledFab icon="search" onPress={onSearch} accessibilityLabel="Search" />
    </>
  );
};

ShowsScreen.navigationOptions = {
  title: 'Shows'
};
