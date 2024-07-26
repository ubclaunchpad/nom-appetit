// import ExitNavigation from "@components/ExitNavigation";
// import SearchInput from "@components/SearchInput";
// import StarRating from "@components/StarRating";
// import { useState } from "react";
// import { Pressable, StyleSheet, Text, View } from "react-native";
// import { Slider } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Filter() {
//   const [location, setLocation] = useState("");
//   const [distance, setDistance] = useState(25);
//   const [rating, setRating] = useState(0);
//   const [cuisine, setCuisine] = useState(null);
//   const [price, setPrice] = useState("");

//   const [open, setOpen] = useState(false);
//   const [cuisineOptions, setCuisineOptions] = useState([
//     { label: "Italian", value: "italian" },
//     { label: "Chinese", value: "chinese" },
//     { label: "Mexican", value: "mexican" },
//   ]);

//   const updatePrice = (price: string) => {
//     setPrice(price);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.main}>
//         <View style={styles.exitNavigation}>
//           <ExitNavigation exitNavigation="(search)/search" />
//         </View>

//         <View style={styles.filters}>
//         <View style={styles.locationContainer}>
//           <Text style={styles.header}>Location</Text>

//           <View style={{ marginBottom: 1 }}>
//             <SearchInput
//               value={location}
//               onChangeText={setLocation}
//               placeholder="Search location..."
//               autoCapitalize="words"
//               width="100%"
//             />
//           </View>

//           <View style={styles.sliderContainer}>
//             <Text style={styles.sliderText}>Within</Text>

//             <Slider
//               style={{ width: 190, height: 40 }}
//               minimumValue={1}
//               maximumValue={50}
//               value={distance}
//               minimumTrackTintColor="#008781"
//               maximumTrackTintColor="#008781"
//               thumbTintColor="#004643"
//               thumbStyle={styles.thumb}
//               onValueChange={(value) => {
//                 setDistance(Math.round(value));
//               }}
//             />

//             <View style={styles.distanceContainer}>
//               <Text style={styles.sliderText}>{distance} km</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.cuisineContainer}>
//           <Text style={styles.header}>Type of Cuisine</Text>

//         </View>

//         <View style={styles.ratingContainer}>
//           <Text style={styles.header}>Rating</Text>

//           <View style={styles.stars}>
//             <StarRating maxRating={5} onChange={setRating} />
//           </View>
//         </View>

//         <View style={styles.priceContainer}>
//           <Text style={styles.header}>Price</Text>

//           <View style={styles.innerPriceContainer}>
//             <Pressable
//               style={styles.individualPriceCategory}
//               onPress={() => updatePrice("$")}
//             >
//               <Text>$</Text>
//             </Pressable>
//             <Pressable
//               style={styles.individualPriceCategory}
//               onPress={() => updatePrice("$$")}
//             >
//               <Text>$$</Text>
//             </Pressable>
//             <Pressable
//               style={styles.individualPriceCategory}
//               onPress={() => updatePrice("$$$")}
//             >
//               <Text>$$$</Text>
//             </Pressable>
//           </View>
//         </View>

//         <View style={styles.submitContainer}>
//           <Pressable style={styles.resetContainer}>
//             <Text style={styles.resetText}>Reset</Text>
//           </Pressable>

//           <Pressable style={styles.applyContainer}>
//             <Text style={styles.applyText}>Apply</Text>
//           </Pressable>
//         </View>
//         </View>


//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#E6EFD9",
//   },
//   main: {
//     width: 334,
//     flex: 1,
//     backgroundColor: "pink",
//   },
//   filters: {
//     flex: 1,
//     justifyContent: "center",
//     paddingVertical: 10, 
//     // backgroundColor: "lightblue",
//   },
//   exitNavigation: {
//     marginTop: 10,
//     // backgroundColor: "red",
//   },
//   locationContainer: {
//     // backgroundColor: "yellow",
//   },
//   header: {
//     fontSize: 18,
//     fontFamily: "Lato",
//     color: "#004643",
//     marginBottom: 15,
//   },
//   sliderContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     height: 48,
//     paddingHorizontal: 15,
//     borderWidth: 1,
//     borderRadius: 12,
//     borderColor: "#80A29E",
//     marginTop: 10,
//     justifyContent: "space-between",
//   },
//   sliderText: {
//     fontFamily: "Lato",
//     color: "#004643",
//   },
//   thumb: {
//     width: 18,
//     height: 18,
//     borderRadius: 10,
//     backgroundColor: "#004643",
//   },
//   distanceContainer: {
//     width: 40,
//     alignItems: "center",
//   },
//   cuisineContainer: {
//     marginTop: 30,
//     // backgroundColor: "lightblue",
//     zIndex: 5,
//   },
//   dropdown: {
//     height: 48,
//     borderRadius: 12,
//     borderColor: "#80A29E",
//     fontFamily: "Lato",
//   },
//   dropdownContainer: {
//     borderRadius: 12,
//     borderColor: "#80A29E",
//   },
//   dropdownText: {
//     fontFamily: "Lato",
//     color: "#004643",
//   },
//   ratingContainer: {
//     marginTop: 30,
//     // backgroundColor: "lightgreen",
//   },
//   stars: {
//     alignItems: "center",
//   },
//   priceContainer: {
//     marginTop: 30,
//     // backgroundColor: "lightcoral",
//   },
//   innerPriceContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   individualPriceCategory: {
//     backgroundColor: "white",
//     width: 100,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderRadius: 12,
//     borderColor: "#80A29E",
//   },
//   submitContainer: {
//     marginTop: 40,
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     // backgroundColor: "lightyellow",
//   },
//   resetContainer: {
//     backgroundColor: "#F3CC91",
//     width: 142,
//     height: 48,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   resetText: {
//     color: "#004643",
//     fontFamily: "Lato",
//   },
//   applyContainer: {
//     backgroundColor: "#6F846E",
//     width: 142,
//     height: 48,
//     borderRadius: 12,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   applyText: {
//     color: "#FFFFFF",
//     fontFamily: "Lato",
//   },
// });

