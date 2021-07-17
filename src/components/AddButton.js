import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../classes/Colors";

//make a button that goes to the right of the header that adds a class
const AddButton = ({ navigation, destination }) => {
  return (
    <TouchableOpacity onPress={() => navigation.push(destination)}>
      <View
        style={{
          marginRight: 20,
          backgroundColor: Colors.primaryColor,
          borderRadius: 5,
          padding: 0.5,
        }}
      >
        <Entypo name="plus" size={22} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default AddButton;