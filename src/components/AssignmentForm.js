import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "../classes/Calendar";
import { Context as ClassesContext } from "../context/ClassesContext";
import HorizontalScrollPicker from "./HorizontalScrollPicker";
import { AssignmentTypeIcons } from "../icons/AssignmentTypeIcons";
import AccordionListItem from "./AccordianListItem";
import CalendarDisplay from "../calendar/CalendarDisplay";
import HeaderButton from "./HeaderButton";

const AssignmentForm = ({ onSubmit, initialValues, calendarData }) => {
  const classes = useContext(ClassesContext);

  //set default values
  const [title, setTitle] = useState("");
  const [schoolClass, setSchoolClass] = useState(classes.state[0]);
  const [iconName, setIconName] = useState(
    AssignmentTypeIcons.iconList(30, "white")[0].name
  );
  const [date, setDate] = useState(new Date());
  const [attachedNotes, setAttachedNotes] = useState([]);
  const [classIsOpen, setClassIsOpen] = useState(true);
  const [typeIsOpen, setTypeIsOpen] = useState(true);
  const [calendarIsOpen, setCalendarIsOpen] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    if (initialValues !== null) {
      setTitle(initialValues.title);
      setSchoolClass(initialValues.schoolClass);
      setIconName(initialValues.iconName);
      setAttachedNotes(initialValues.attachedNotes);
    }
  }, []);

  //add a save and cancel button on either side of the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton name="Save" onPressCallback={() => onSubmit()} />,
      headerLeft: () => (
        <HeaderButton name="Cancel" onPressCallback={() => navigation.pop()} />
      ),
    });
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.textInputContainer}>
          <Text style={styles.textInputLabel}>{"Title: "}</Text>
          <TextInput
            style={styles.input}
            value={title}
            placeholder="(Optional)"
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <AccordionListItem
          title="Class:  "
          pickedItem={schoolClass.name}
          open={classIsOpen}
          setOpen={(boolean) => setClassIsOpen(boolean)}
        >
          <HorizontalScrollPicker
            optionsToPick={classes.state}
            onPressCallback={(pickedItem) => {
              setSchoolClass(pickedItem);
              setClassIsOpen(false);
            }}
            currentPick={schoolClass.id}
          />
        </AccordionListItem>
        <AccordionListItem
          title="Type:  "
          pickedItem={iconName}
          open={typeIsOpen}
          setOpen={(boolean) => setTypeIsOpen(boolean)}
        >
          <HorizontalScrollPicker
            optionsToPick={AssignmentTypeIcons.iconList(30, "black")}
            onPressCallback={(pickedItem) => {
              setIconName(pickedItem.name);
              setTypeIsOpen(false);
            }}
            currentPick={iconName}
            backgroundColor={schoolClass.primaryColor}
          />
        </AccordionListItem>
        <AccordionListItem
          title="Date:  "
          pickedItem={
            Calendar.monthNames[date.getMonth()] +
            " " +
            date.getDate() +
            ", " +
            date.getFullYear()
          }
          open={calendarIsOpen}
          setOpen={setCalendarIsOpen}
        >
          <View style={{ marginBottom: 25 }}>
            <CalendarDisplay
              weeksArray={calendarData.weeksArray}
              monthDataArray={calendarData.monthDataArray}
              spaceBetweenPages={Calendar.spaceBetweenPages}
              onPressCallback={(pickedItem) => {
                const monthIndexOfSelectedDate = pickedItem.monthIndex;
                const selectedDate = pickedItem.day;
                const monthOfSelectedDate =
                  calendarData.monthDataArray[monthIndexOfSelectedDate].month + 1;
                const yearOfSelectedDate =
                  calendarData.monthDataArray[monthIndexOfSelectedDate].year;
                setDate(
                  new Date(
                    monthOfSelectedDate + "/" + selectedDate + "/" + yearOfSelectedDate
                  )
                );
                setCalendarIsOpen(false);
              }}
            />
          </View>
        </AccordionListItem>
        <View style={{ marginBottom: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 2,
    fontSize: 20,
    fontWeight: "600",
    width: 500,
  },
  textInputLabel: { fontSize: 20, fontWeight: "600", letterSpacing: 0.5 },
  textInputContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
  },
});

export default AssignmentForm;
