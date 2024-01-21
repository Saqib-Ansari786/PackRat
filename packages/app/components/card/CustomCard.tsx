import React from 'react';
import { RStack, RSeparator } from '@packrat/ui';
import { View } from 'react-native';
import { SearchItem } from '../item/searchItem';
import useCustomStyles from 'app/hooks/useCustomStyles';
import { TripCardHeader } from './TripCardHeader';
import { PackCardHeader } from './PackCardHeader';

export const CustomCard = ({ title, content, footer, link, type, data }) => {
  const styles = useCustomStyles(loadStyles);

  if (!data) return null;

  return (
    <View style={styles.mainContainer}>
      <RStack style={{ width: '100%', gap: 30 }}>
        <View
          style={{
            padding: 15,
            paddingBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {type === 'trip' ? (
            <TripCardHeader data={data} title={title} link={link} />
          ) : (
            <PackCardHeader data={data} title={title} link={link} />
          )}
        </View>
        <RSeparator />
        {type === 'pack' ? (
          <>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 16,
                paddingLeft: 16,
              }}
            >
              <SearchItem placeholder={'Search Item'} />
            </View>
            <RSeparator />
          </>
        ) : null}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 16,
            paddingLeft: 16,
          }}
        >
          {content}
        </View>
        <RSeparator />
        <View style={{ padding: 16, paddingTop: 0 }}>{footer}</View>
      </RStack>
    </View>
  );
};

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.card,
      flex: 1,
      gap: 45,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 15,
      paddingBottom: 15,
      marginBottom: 20,
      border: '1',
      alignSelf: 'center',
      borderRadius: 10,
    },
  };
};