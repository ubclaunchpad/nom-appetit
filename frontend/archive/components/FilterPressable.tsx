import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";

type FilterPressableProps = {
  filter: string;
  title: string;
  filterFunction: (type: string) => {};
};

export default function FilterPressable(props: FilterPressableProps) {
  const [visible, setVisible] = useState(true);

  const onPressFunction = () => {
    setVisible(false)
    props.filterFunction(props.title)
  }

  if (visible && props.filter != "") {
    return(
      <View style={styles.container}>
        <Pressable onPress={onPressFunction}>
          <Icon style={styles.icon} name="squared-cross" type="entypo" color="#004643" size={14} />
        </Pressable>
        <Text style={styles.text}>{props.filter}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3CC91",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  text: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: "#004643",
  },
  icon: {
    alignItems: "center", 
    marginRight: 5,
    color: "#004643",
  },
});