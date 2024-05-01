"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Modal,
  Platform,
  FlatList,
  StatusBar,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { FontAwesome } from "@expo/vector-icons";
import { druglist } from "../action";
import IsLoadingComponent from "./components/isloading";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [datalist, setdatalist] = useState();
  const profile = () => {
    navigation.navigate("Login");
  };
  const { data, isPending } = useQuery({
    queryKey: ["druglist"],
    queryFn: () => druglist(),
  });
  console.log(datalist);
  useEffect(() => {
    if (data) setdatalist(data?.data?.data);
  });
  const handlePickImage = () => {
    // Implement image picking logic here
  };
  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImage];
    updatedImages.splice(index, 1);
    setSelectedImage(updatedImages);
  };

  const handleSubmitModal = () => {
    // Implement submission logic here
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Welcome to My App</Text>
        <Text style={styles.subtitle}>Explore and enjoy!</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require("./img/drugs.png")}
              style={styles.buttonImage}
            />
            <Text>Home</Text>
          </TouchableOpacity>
        </View>
        <IsLoadingComponent isLoading={isPending} />
      </ScrollView>

      <ScrollView style={styles.ListData}>
        <FlatList
          data={datalist}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.international_name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.drug_id.toString()}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              placeholder="Write a task"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity onPress={handlePickImage}>
              <View style={styles.modalButton}>
                <FontAwesome name="image" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {selectedImage.map((image, idx) => (
                <View key={idx} style={styles.uploadedImageContainer}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.uploadedImage}
                  />
                  <TouchableOpacity onPress={() => handleDeleteImage(idx)}>
                    <FontAwesome name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Button
              style={styles.modalButtonSub}
              title="Submit"
              onPress={handleSubmitModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  ListData: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
    alignItems: "center",
  },
  searchBar: {
    width: "100%",
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalInput: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
  },
  modalButtonSub: {
    width: 10,

    marginBottom: 10,
    backgroundColor: "#2c69d3",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    marginBottom: 10,
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  button: {
    alignItems: "center",
  },
  buttonImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  menuButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 999,
  },
  menuText: {
    fontSize: 24,
  },
  keyboardAvoidingView: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
  addButton: {
    backgroundColor: "#007BFF",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: "#fff",
    fontSize: 24,
  },
});

export default HomeScreen;
