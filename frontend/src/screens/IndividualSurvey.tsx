import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from "react-native";
import RadioButton from "src/components/RadioButton";
import Images from "src/images/Images";

enum buttonState {
  selected = "selected",
  unselected = "unselected",
  initialized = "initialized",
}

export default function IndividualSurvey() {
  const [options, setOptions] = useState([
    {
      question: "To try a new place",
      state: buttonState.initialized,
    },
    {
      question: "A fine dining experience",
      state: buttonState.initialized,
    },
    {
      question: "Vegetarian/vegan options",
      state: buttonState.initialized,
    },
    {
      question: "Gluten-free options",
      state: buttonState.initialized,
    },
    {
      question: "Outdoor seating",
      state: buttonState.initialized,
    },
    {
      question: "Live music or entertainment",
      state: buttonState.initialized,
    },
    {
      question: "Local eateries",
      state: buttonState.initialized,
    },
    {
      question: "Fusion cuisine",
      state: buttonState.initialized,
    },
    {
      question: "Tasting menus",
      state: buttonState.initialized,
    },
    {
      question: "Scenic views",
      state: buttonState.initialized,
    },
  ]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Let's Find You Somewhere to Eat</Text>
          <Image source={Images.pandaPizza} style={styles.logo} />
        </View>

        <View style={styles.optionList}>
          <View style={styles.columns}>
            <Text style={styles.columnText}>I prefer...</Text>
            <Text style={styles.radioButtonText}>Yes</Text>
            <Text style={styles.radioButtonText}>No</Text>
          </View>
          <View style={{ width: 262, height: 386 }}>
            <FlatList
              data={options}
              contentContainerStyle={{
                justifyContent: "center",
              }}
              renderItem={({ item }) => (
                <>
                  <View style={styles.listItem}>
                    <Text style={styles.listText}>{item.question}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setOptions((options) => {
                          return options.map((option) => {
                            if (option.question === item.question) {
                              return {
                                ...option,
                                state: buttonState.selected,
                              };
                            } else {
                              return option;
                            }
                          });
                        });
                      }}
                    >
                      <RadioButton type="yes" state={item.state} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setOptions((options) => {
                          return options.map((option) => {
                            if (option.question === item.question) {
                              return {
                                ...option,
                                state: buttonState.unselected,
                              };
                            } else {
                              return option;
                            }
                          });
                        });
                      }}
                    >
                      <RadioButton type="no" state={item.state} />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            />
          </View>
        </View>
        <Pressable style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e6efd9",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 41,
    height: 53,
  },
  header: {
    flexDirection: "row",
    margin: 20,
  },
  title: {
    width: 248,
    height: 58,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#004643",
  },
  optionList: {
    width: 364,
    height: 520,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
  },
  columns: {
    width: 262,
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 28,
  },
  columnText: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "600",
    width: 144,
    color: "#004643",
  },
  radioButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#004643",
  },
  listItem: {
    width: 262,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  listText: {
    textAlign: "left",
    fontSize: 16,
    width: 144,
    color: "#004643",
  },
  submitButton: {
    marginTop: 30,
    width: 200,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F3CC91",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#004643",
  },
});
