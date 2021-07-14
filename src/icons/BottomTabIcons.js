import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { IconsList } from "./IconsList";

export class BottomTabIcons extends IconsList {
  static iconList(iconSize, iconColor) {
    console.log("icon list");
    return [
      {
        icon: <Ionicons name="school-outline" size={iconSize} color={iconColor} />,
        title: "Classes",
      },
      {
        icon: <AntDesign name="folder1" size={iconSize} color={iconColor} />,
        title: "Folders",
      },
      {
        icon: <FontAwesome5 name="calendar-check" size={iconSize} color={iconColor} />,
        title: "Planner",
      },
      {
        icon: <Entypo name="home" size={iconSize} color={iconColor} />,
        title: "Home",
      },
      {
        icon: <SimpleLineIcons name="note" size={iconSize} color={iconColor} />,
        title: "Notes",
      },
    ];
  }
}
