"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { View, Text, StyleSheet, Image } from "react-native";
import IsLoadingComponent from "./components/isloading";

import { Getdrugid } from "../action";
const DrugDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [detailData, setdetailData] = useState();

  const { data, isPending, isLoading, error } = useQuery({
    queryKey: ["Getdrugid", id],
    queryFn: () => Getdrugid(id),
  });

  useEffect(() => {
    if (data) {
      setdetailData(data?.data?.[0]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/loading.jpg")} />
      </View>
    );
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View>
        {/* <Text>Drug ID: {detailData?.drug_id}</Text> */}
        <Text>Trade Name: {detailData?.trade_name}</Text>
        <Text>International Name: {detailData?.international_name}</Text>
        <Text>Swing: {detailData?.swing}</Text>
        <Text>Conditions Drug: {detailData?.conditions_drug}</Text>
        <Text>Operator Name: {detailData?.operator_name}</Text>
        <Text>Drug Image: {detailData?.drug_image}</Text>
        <Text>Drug Composition: {detailData?.drug_composition}</Text>
        <Text>Application Clause: {detailData?.application_clause}</Text>
        <Text>Ban Drug: {detailData?.ban_drug}</Text>
        <Text>Side Effects: {detailData?.side_effects}</Text>
        <Text>Validity Period: {detailData?.validity_period}</Text>
        <Text>Storage Conditions: {detailData?.storage_conditions}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 1000,
    height: 1000,
    resizeMode: "contain",
  },
});
export default DrugDetailScreen;
