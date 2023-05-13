import { Container, Box, Text, HStack, Stack } from "native-base";
import { StyleSheet } from "react-native";
import { useAuth } from "../../auth/provider";
import Card from "./Card";
// import useGetPublicPacks from "../../hooks/useGetPublicPacks";
import { theme } from "../../theme";
import DropdownComponent from "../Dropdown";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPublicPacks } from "../../store/feedStore";

import { Link } from "expo-router";

const dataValues = ["Favorite", "Most Recent"];

export default function Feed() {
  const [queryString, setQueryString] = useState("");

  // const { data, isLoading, isError, error } = useGetPublicPacks(queryString);
  
  const dispatch = useDispatch()
  const publicPacksData = useSelector((state) => state.feed.publicPacks);

  useEffect(() => {
    dispatch(getPublicPacks(queryString))
  }, [queryString]);

  return (
    <Box style={styles.mainContainer}>
      <DropdownComponent
        value={queryString}
        data={dataValues}
        setUnit={setQueryString}
        style={styles.dropdown}
      />

      <Stack
        direction={["column", "column", "column", "row"]}
        space={[3, 3, 3, 0]}
        flexWrap="wrap"
      >

        {publicPacksData?.length > 0 ? (
          publicPacksData?.map((pack) => <Link href={"/pack/" + pack?._id}><Card key={pack?.owner_id} {...{ ...pack }} /></Link>)
          ) : (
          <Text>No Public Packs Available</Text>
        )}
      </Stack>
    </Box>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    minHeight: "100vh",
    gap: 15,
    padding: 15,
    fontSize: 18,
    width: "100%",
  },
  packsContainer: {
    flexDirection: "column",
    minHeight: "100vh",

    padding: 25,
    fontSize: 26,
  },
  dropdown: {
    backgroundColor: "white",
  },
});
