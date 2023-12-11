import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../theme';
import UseTheme from '../../../hooks/useTheme';
import { RTooltip, RButton, RScrollView } from '@packrat/ui';
import { CustomModal } from '../../../components/modal';
import { AddItemGlobal } from '../../../components/item/AddItemGlobal';
import { ItemsTable } from '../../../components/itemtable/itemTable';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsGlobal } from '../../../store/globalItemsStore';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import useCustomStyles from '~/hooks/useCustomStyles';

export default function Items() {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  // pagination index limit
  const [limit, setLimit] = useState(5);
  // page number for pagination
  const [page, setPage] = useState(1);
  // it will be used as a dependency for reloading the data in case of some modifications
  const [refetch, setRefetch] = useState(false);

  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    UseTheme();
  const styles = useCustomStyles(loadStyles);
  const data = useSelector((state) => state.globalItems);

  const isLoading = useSelector((state) => state.globalItems.isLoading);
  const isError = useSelector((state) => state.globalItems.isError);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemsGlobal({ limit, page }));
  }, [limit, page, refetch]);

  return (
    <RScrollView>
      {Platform.OS === 'web' && (
        <Head>
          <title>Items</title>
        </Head>
      )}
      <Stack.Screen
        options={{
          title: 'Items',
          name: 'Items',
        }}
      />
      <View>
        <>
          <CustomModal
            title="Add a global Item"
            trigger="Add Item"
            isActive={isAddItemModalOpen}
            triggerComponent={
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '2rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {' '}
                <RButton
                  style={styles.button}
                  onPress={() => {
                    setIsAddItemModalOpen(true);
                  }}
                >
                  Add Item
                </RButton>
                {Platform.OS === 'web' ? (
                  <RTooltip
                    Label="Add a global item"
                    Icon={<MaterialIcons
                      name="info-outline"
                      size={24}
                      color={currentTheme.colors.background}
                    />}
                  />
                ) : null}
              </View>
            }
            onTrigger={setIsAddItemModalOpen}
          >
            <AddItemGlobal
              setRefetch={setRefetch}
              refetch={refetch}
              setIsAddItemModalOpen={setIsAddItemModalOpen}
            />
          </CustomModal>
        </>
        {!isError && Array.isArray(data.globalItems.items) ? (
          <ItemsTable
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            data={data}
            isLoading={isLoading}
            totalPages={data?.globalItems?.totalPages}
            refetch={refetch}
            setRefetch={setRefetch}
          />
        ) : null}
      </View>
    </RScrollView>
  );
}
const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    button: {
      backgroundColor: currentTheme.colors.background,
      color: currentTheme.colors.white,
      width: Platform.OS === 'web' ? '20rem' : '20%',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
  };
};