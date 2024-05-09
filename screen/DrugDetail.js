"use client";

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Getdrugid } from "../action";

const DrugDetailScreen = ({ route }) => {
  const id = route.params;
  console.log(id);
  const [detailData, setDetailData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drugDetails = await Getdrugid(id);
        if (drugDetails) {
          console.log(drugDetails);
          setDetailData(drugDetails.data[0]);
        } else {
          setError("Failed to fetch drug details.");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {detailData && (
        <View>
          <Text>Trade Name: {detailData.trade_name}</Text>
          <Text>International Name: {detailData.international_name}</Text>
          <Text>Swing: {detailData.swing}</Text>
          <Text>Conditions Drug: {detailData.conditions_drug}</Text>
          <Text>Operator Name: {detailData.operator_name}</Text>
          <Text>Drug Composition: {detailData.drug_composition}</Text>
          <Text>Application Clause: {detailData.application_clause}</Text>
          <Text>Ban Drug: {detailData.ban_drug}</Text>
          <Text>Side Effects: {detailData.side_effects}</Text>
          <Text>Validity Period: {detailData.validity_period}</Text>
          <Text>Storage Conditions: {detailData.storage_conditions}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DrugDetailScreen;
