import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "../components/BackButton";
import {
  FloatingActionButton,
  FloatingButtonStyles,
} from "../components/FloatingActionButton";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { GeneralIcons } from "../icons/GeneralIcons";

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton color={route.params.primaryColor} />,
    });
  });
  return (
    <View style={{ flex: 1 }}>
      <Text>List Screen</Text>
      <View style={FloatingButtonStyles.buttonContainer}>
        <View style={FloatingButtonStyles.buttonPosition}>
          <Menu
            style={{}}
            renderer={renderers.Popover}
            rendererProps={{ anchorStyle: styles.anchorStyle, placement: "top" }}
          >
            <MenuTrigger
              children={<FloatingActionButton color={route.params.primaryColor} />}
              customStyles={triggerStyles}
            />
            <MenuOptions customStyles={optionStyles}>
              <MenuOption
                text="Photo"
                onSelect={() => navigation.navigate("Camera", route.params)}
              />
              <MenuOption text="Note" />
              <MenuOption text="Task" />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </View>
  );
};

const IconNextToText = (title, iconName) => {
  <View style={{ alignItems: "center" }}>
    <View style={{ flexDirection: "row", alignItems: "center", padding: 3 }}>
      {GeneralIcons.findIcon(iconName, 16, "black")}
      <Text style={{ marginLeft: 5, fontSize: 14 }}>{title}</Text>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  anchorStyle: {
    backgroundColor: "white",
    opacity: 0,
  },
});

const optionStyles = {
  optionTouchable: {
    underlayColor: "transparent",
    activeOpacity: 0.7,
  },
  optionWrapper: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    margin: 3,
  },
  optionText: {
    color: "black",
    alignSelf: "center",
    fontSize: 14,
    margin: 6,
  },
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 200,
    padding: 3,
  },
};

const triggerStyles = {
  triggerTouchable: {
    underlayColor: "transparent",
    activeOpacity: 0.5,
  },
};

export default NotesScreen;
