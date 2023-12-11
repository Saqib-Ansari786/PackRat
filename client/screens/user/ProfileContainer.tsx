import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, ScrollView, View } from 'react-native';
import { RIconButton, RStack, RText, RSkeleton } from '@packrat/ui';
import UserDataContainer from '../../components/user/UserDataContainer';
import { useAuth } from '../../auth/provider';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import useGetPacks from "../../hooks/useGetPacks";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPacks, selectAllPacks } from '../../store/packsStore';
import {
  fetchUserFavorites,
  selectAllFavorites,
} from '../../store/favoritesStore';
import { getUser } from '../../store/userStore';
import { fetchUserTrips, selectAllTrips } from '../../store/tripsStore';
import { useMatchesCurrentUser } from '~/hooks/useMatchesCurrentUser';
import { useRouter } from 'expo-router';
import useCustomStyles from '~/hooks/useCustomStyles';
import Avatar from '../../components/Avatar';

const SettingsButton = () => {
  const router = useRouter();

  const onSettingsClick = () => {
    router.push('/profile/settings');
  };

  return (
    <RIconButton
      onPress={onSettingsClick}
      style={{
        backgroundColor: "transparent",
        marginBottom: "16px",
        justifyContent: "center",
        border:"1px solid lightgray",
        borderRadius: "8px",
      }}
      icon={
        <MaterialCommunityIcons 
          name="cog-outline" 
          size={24} 
          color={'grey'} />
      }
    />
  );
};

const Header = ({
  user,
  isLoading,
  error,
  tripsCount,
  packsCount,
  favoritesCount,
  isCurrentUser,
}) => {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const profileImage = user?.profileImage ?? null;
  const userRealName = user?.name ?? null;
  const userEmail = user?.email ?? null;
  const userEmailSplitFirstHalf = userEmail?.split('@')[0] ?? null;
  const username = user?.username
    ? `@${user?.username}`
    : `@${userEmailSplitFirstHalf}`;

  return (
    <View style={{width: "50%", ...styles.infoSection}}>
      <RStack style={{flexDirection: "row", width: "100%", alignItems:"center"}}>
        {isCurrentUser && !isLoading && (
          <View style={{alignSelf: "flex-start", marginLeft: "auto"}}>
            <SettingsButton />
          </View>
        )}
        <RStack style={{alignItems:"center", flex:"1"}} >
          <View style={styles.userInfo}>
            {isLoading ? (
              <>
                <RSkeleton style={{borderRadius: "100%", height: "100px", width: "100px"}} />
                <RSkeleton
                  style={{height: "100px", width:"100%", marginTop: "8px", alignItems: "center"}}
                />
              </>
            ) : (
              <>
                <Avatar src={user?.profileImage} />
                <RText style={{marginTop: "16px",...styles.userName}}>{userRealName}</RText>
                <RText style={styles.userEmail}>{username}</RText>
              </>
            )}
          </View>
        </RStack>
        {isCurrentUser && !isLoading && <View style={{width: 45}}/>}{' '}
        {/* This empty box is to offset the space taken by the settings button, ensuring the profile details remain centered. */}
      </RStack>
      <RStack style={{flexDirection:"row", ...styles.card}}>
        {isLoading ? (
          <>
            <RSkeleton
              style={{borderRadius: "100%", width: "50px", height: "50px"}}
            />
            <RSkeleton
              style={{borderRadius: "100%", width: "50px", height: "50px"}}
            />
            <RSkeleton
              style={{borderRadius: "100%", width: "50px", height: "50px"}}
            />
            <RSkeleton
              style={{borderRadius: "100%", width: "50px", height: "50px"}}
            />
          </>
        ) : (
          <>
            <View style={styles.cardInfo}>
              <RText>Trips</RText>
              <RText>{tripsCount}</RText>
            </View>
            <View style={styles.cardInfo}>
              <RText color={currentTheme.colors.textColor}>Packs</RText>
              <RText color={currentTheme.colors.textColor}>{packsCount}</RText>
            </View>
            <View style={styles.cardInfo}>
              <RText color={currentTheme.colors.textColor}>Favorites</RText>
              <RText color={currentTheme.colors.textColor}>
                {favoritesCount}
              </RText>
            </View>
            <View style={styles.cardInfo}>
              <RText color={currentTheme.colors.textColor}>Certified</RText>
              <MaterialCommunityIcons
                name="certificate-outline"
                size={24}
                color={
                  user?.is_certified_guide
                    ? currentTheme.colors.cardIconColor
                    : currentTheme.colors.textColor
                }
              />
            </View>
          </>
        )}
      </RStack>
      {error ? <RText>{error}</RText> : null}
    </View>
  );
};

// Skeleton version of the UserDataCard component
const SkeletonUserDataCard = () => {
  return (
    <View
      style={{
        borderRadius: 15, 
        backgroundColor:'lightgray',
        padding: 10,
        margin: 5,
        width: '90%',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <RSkeleton
        style={{marginBottom: "8px", height: "50px", width: "70%"}}
      />
      <RSkeleton
        style={{marginBottom: "8px", height: "50px", width: "50%"}}
      />
      <RSkeleton
        style={{height: "50px", width: "30%"}}
      />
    </View>
  );
};

export default function ProfileContainer({ id = null }) {
  const dispatch = useDispatch();
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } =
    useTheme();
  const styles = useCustomStyles(loadStyles);
  const authUser = useSelector((state) => state.auth.user);
  const userStore = useSelector((state) => state.userStore);
  const authStore = useSelector((state) => state.auth);
  const allPacks = useSelector(selectAllPacks);
  const tripsData = useSelector(selectAllTrips);
  const allFavorites = useSelector(selectAllFavorites);

  id = id ?? authUser?._id;

  const differentUser = id && id !== authUser?._id;
  const isCurrentUser = useMatchesCurrentUser(id); // TODO: Implement this hook in more components

  useEffect(() => {
    if (differentUser) {
      dispatch(getUser(id));
    } else {
      dispatch(fetchUserPacks({ ownerId: authUser?._id }));
      dispatch(fetchUserFavorites(authUser?._id));
      dispatch(fetchUserTrips(authUser?._id));
    }
  }, [dispatch, id, authUser, differentUser]);

  const user = differentUser ? userStore.user : authUser;

  const isLoading = differentUser ? userStore.loading : authStore.loading;

  const error = differentUser ? userStore.error : authStore.error;

  const packsData = differentUser ? user?.packs : allPacks;
  const favoritesData = differentUser ? user?.favorites : allFavorites;

  const tripsCount = tripsData?.length ?? 0;
  const packsCount = packsData?.length ?? 0;
  const favoritesCount = favoritesData?.length ?? 0;
  const isCertified = user?.isCertified ?? false;

  // if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <RStack
        style={[
          styles.mainContainer,
          Platform.OS == 'web' ? { minHeight: '100vh' } : null,
        ]}
      >
        <Header
          user={user}
          isLoading={isLoading}
          error={error}
          tripsCount={tripsCount}
          packsCount={packsCount}
          favoritesCount={favoritesCount}
          isCurrentUser={isCurrentUser}
        />
        <View style={styles.mainContentContainer}>
          <View style={styles.userDataContainer}>
            {isLoading && (
              <UserDataContainer
                data={[]}
                type="packs"
                userId={user?._id}
                isLoading={isLoading}
                SkeletonComponent={SkeletonUserDataCard}
              />
            )}
          </View>

          <View style={styles.userDataContainer}>
            {favoritesData?.length > 0 ? (
              <UserDataContainer
                data={favoritesData}
                type="favorites"
                userId={user?._id}
                isLoading={isLoading}
              />
            ) : (
              <RText
                fontSize={20}
                fontWeight="bold"
                color={currentTheme.colors.textColor}
              >
                No favorites yet
              </RText>
            )}

          </View>
          {Array.isArray(packsData) && packsData.length > 0 && (
            <View style={styles.userDataContainer}>
              <UserDataContainer
                data={packsData}
                type="packs"
                userId={user?._id}
              />
            </View>
          )}
          {Array.isArray(tripsData) && tripsData?.length > 0 && (
            <View style={styles.userDataContainer}>
              <UserDataContainer
                data={tripsData}
                type="trips"
                userId={user?._id}
              />
            </View>
          )}
        </View>
      </RStack>
    </ScrollView>
  );
}

const loadStyles = (theme) => {
  const { currentTheme } = theme;
  return {
    mainContainer: {
      backgroundColor: currentTheme.colors.background,
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    infoSection: {
      flexDirection: 'column',
      backgroundColor: currentTheme.colors.white,
      alignItems: 'center',
      borderRadius: 12,
      marginBottom: 25,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
      justifyContent: 'center',
    },
    userInfo: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    userEmail: {
      fontSize: 16,
      color: currentTheme.colors.textDarkGrey,
      textAlign: 'center',
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 15,
      borderRadius: 12,
      backgroundColor: currentTheme.colors.card,
      marginVertical: 15,
    },
    cardInfo: {
      alignItems: 'center',
    },
    mainContentContainer: {
      width: '100%',
      flex: 1,
    },
    userDataContainer: {
      marginBottom: 25,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userDataCard: {
      borderRadius: 15,
      backgroundColor: currentTheme.colors.card,
      padding: 10,
      margin: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
  };
};