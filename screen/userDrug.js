"use client";

import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";

const UserDrugScreen = () => {
  const [value, setValue] = useState("");

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "walk",
              label: "Walking",
            },
            {
              value: "train",
              label: "Transit",
            },
            { value: "1", abel: "Driving" },
            { value: "drive", abel: "Driving" },
          ]}
        />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
export default UserDrugScreen;
