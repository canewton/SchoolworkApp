import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WrittenNote } from "../classes/WrittenNote";
import { ImageNote } from "../classes/ImageNote";
import { GeneralIcons } from "../icons/GeneralIcons";
import { ItemArray } from "../classes/ItemArray";

const NotesList = ({ notesFilteredByDate, mode }) => {
  const modes = ["browse", "select"];
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const outerSpacing = 3;
  const imagesPerRow = 2;
  const columnWidth = windowWidth / imagesPerRow - outerSpacing;

  const [itemsSelected, setItemsSelected] = useState([]);

  return (
    <View style={{ flex: 1, paddingHorizontal: outerSpacing }}>
      <FlatList
        numColumns={imagesPerRow}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={notesFilteredByDate}
        keyExtractor={(image) => image.id + ""}
        renderItem={({ item }) => {
          return (
            <View style={{ width: columnWidth }}>
              <TouchableOpacity
                disabled={mode === modes[0]}
                onPress={() => {
                  ItemArray.find(itemsSelected, "", item.id) === false
                    ? setItemsSelected([...itemsSelected, item.id])
                    : setItemsSelected(ItemArray.remove(itemsSelected, item.id));
                }}
                style={styles.note}
              >
                {item instanceof ImageNote && (
                  <ImageButton
                    style={{ flex: 0.5 }}
                    navigation={navigation}
                    note={item}
                    disableButton={mode === modes[1]}
                  />
                )}
                {item instanceof WrittenNote && (
                  <NoteButton
                    style={{
                      backgroundColor: item.schoolClass.primaryColor,
                      borderRadius: 10,
                      padding: 10,
                    }}
                    note={item}
                    navigation={navigation}
                    disableButton={mode === modes[1]}
                  />
                )}
                {mode === modes[1] && !ItemArray.find(itemsSelected, "", item.id) && (
                  <View style={{ position: "absolute", right: 10, top: 8 }}>
                    <View style={styles.checkContainter}>
                      <View style={styles.emptyCircle} />
                    </View>
                  </View>
                )}
                {mode === modes[1] && ItemArray.find(itemsSelected, "", item.id) && (
                  <View style={{ position: "absolute", right: 10, top: 8 }}>
                    <View style={styles.checkContainter}>
                      {GeneralIcons.findIcon("Checkmark Circle", 24, "#147EFB")}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const NoteButton = ({ style, note, navigation, disableButton }) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={() => navigation.navigate("Edit Note", note)}
      disabled={disableButton}
    >
      <Text style={styles.title}>{note.title === "" ? "Untitled" : note.title}</Text>
      <Text style={styles.text}>{note.content === "" ? "" : note.content}</Text>
    </TouchableOpacity>
  );
};

const ImageButton = (props) => {
  return (
    <View style={props.style}>
      <TouchableOpacity
        onPress={
          //if this image is pressed and the mode is not "select", enter fullscreen
          //if this image is pressed and the mode is "select",
          //change the select property in the image context
          props.mode !== "select"
            ? () =>
                props.navigation.navigate("FullscreenStack", {
                  uri: props.item,
                })
            : () => {
                props.toggleSelectImage(props.item.uri);
              }
        }
      >
        <Image source={{ uri: props.note.uri }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCircle: {
    borderRadius: 10,
    borderWidth: 1.5,
    height: 20,
    width: 20,
    borderColor: "#147EFB",
  },
  text: {
    fontSize: 14,
    height: 170,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
  },
  note: {
    flex: 0.5,
    margin: 3,
    height: 200,
  },
  emptyCircle: {
    borderRadius: 10,
    borderWidth: 1.5,
    height: 20,
    width: 20,
    borderColor: "#147EFB",
  },
  checkContainter: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },
});

export default NotesList;
