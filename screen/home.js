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
  SafeAreaView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { FontAwesome } from "@expo/vector-icons";
import IsLoadingComponent from "./components/isloading";
import { Searcname, Categorylist, druglist, newsdatalist } from "../action";
import CardComponent from "./components/card";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [datalist, setdatalist] = useState();
  const [selectedId, setSelectedId] = useState();
  const [searchResult, setsearchResult] = useState("");

  const { data } = useQuery({
    queryKey: ["druglist"],
    queryFn: () => druglist(),
  });
  const { data: newsdata } = useQuery({
    queryKey: ["newsdatalist"],
    queryFn: () => newsdatalist(),
  });

  const { data: searchData, isPending } = useQuery({
    queryKey: ["Searcname", searchQuery],
    queryFn: () => Searcname(searchQuery),
  });

  useEffect(() => {
    if (data) setdatalist(data?.data?.data);
  });
  useEffect(() => {
    if (searchData) setsearchResult(searchData);
  });

  const handlePickImage = () => {};
  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImage];
    updatedImages.splice(index, 1);
    setSelectedImage(updatedImages);
  };
  const handleSubmitModal = () => {};

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";
    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item.id)}
        style={[styles.item, { backgroundColor }]}
      >
        <Text style={[styles.itemText, { color }]}>
          {item.international_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const url = [
    "https://cdn.greensoft.mn/uploads/users/1977/images/Meic/Zurag_2-sml.jpg",
    "https://picsum.photos/702",
  ];
  const handleSearchResultClick = (id) => {
    navigation.navigate("DrugDetailScreen", id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContent}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require("../assets/Logo.png")} />
          <Text style={styles.logoname}> Edrug</Text>
        </View>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            onClear={() => {
              setSearchQuery("");
              navigation.navigate("Main", { screen: "userDrug" });
            }}
          />
        </View>
        {searchResult.data && searchResult.data.length > 0 ? (
          searchResult.data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.searchResultCard}
              onPress={() => handleSearchResultClick(item.id)}
            >
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.international_name}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : searchQuery !== "" ? (
          <View>
            <Text>Хайлтын үр дүн олдсонгүй</Text>
          </View>
        ) : null}
      </View>
      {isPending === true ? (
        <IsLoadingComponent style={styles.loading} isLoading={isPending} />
      ) : null}
      {searchResult && searchResult?.resultCode === 400 ? (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollViewCategroy}
            showsVerticalScrollIndicator
            horizontal={true}
          >
            <TouchableOpacity style={styles.card}>
              <CardComponent data={newsdata?.data?.data} url={url} />
            </TouchableOpacity>
          </ScrollView>
          {/* <View style={styles.container}>
            <SafeAreaView style={styles.ListData}>
              <FlatList
                data={datalist}
                renderItem={renderItem}
                extraData={selectedId}
                keyExtractor={(item) => item.id.toString()}
              />
            </SafeAreaView>
          </View> */}
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  ListData: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flexDirection: "column",
    flex: 3,
    marginTop: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  scrollViewContent: {
    flex: 1,
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: "f0f0f0",
    width: "100%",
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
    width: "auto",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
  },

  CategorybuttonText: {
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 18,
    color: "#FFF",
  },
  Categorybutton: {
    marginRight: 10,
    color: "fff",
    width: "auto",
    height: 30,
    backgroundColor: "#007BFF",
    borderRadius: 20,
    alignItems: "center",
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
  banner: {
    height: "100%",
    alignSelf: "center",
    width: 300,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  logoname: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginLeft: 10,
    alignSelf: "center",
  },
  loading: {
    position: "absolute",
  },
  scrollViewCategroy: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchResultContainer: {
    paddingHorizontal: 10,
  },
  searchResultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  itemText: {
    height: 50,
    width: 400,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center", // Align text horizontally center
    lineHeight: 50, // Set line height equal to container height for vertical centering
  },

  card: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default HomeScreen;
