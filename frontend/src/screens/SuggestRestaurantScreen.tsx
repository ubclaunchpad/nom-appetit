// suggest a restaurant page
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "src/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RadioButton from "../components/RadioButton";
import BasicButton from "../components/BasicButton"

type Props = NativeStackScreenProps<RootStackParamList, "suggestRestaurant">;

export default function SuggestRestaurantScreen({navigation}: Props) {
    return (
        <View>
            <RadioButton 
            onPress={ () => navigation.navigate('home')}
            />
        </View>
    )
}

// interface QuestionOption {
//     id: string;
//     label: string;
//     checked: boolean;
//   }
  
//   const preferences: QuestionOption[] = [
//     { id: 'tryNewPlace', label: 'To try a new place', checked: false },
//     { id: 'fineDining', label: 'A fine dining experience', checked: false },
//     { id: 'vegetarianVegan', label: 'Vegetarian/vegan options', checked: false },
//     { id: 'glutenFree', label: 'Gluten-free options', checked: false },
//     { id: 'outdoorSeating', label: 'Outdoor seating', checked: false },
//     { id: 'liveMusic', label: 'Live music or entertainment', checked: false },
//     { id: 'localEateries', label: 'Support local eateries', checked: false },
//   ];
  
//   const Question = styled.View`
//     margin-bottom: 16px;
//   `;
  
//   const QuestionText = styled.Text`
//     font-size: 16px;
//     font-weight: bold;
//   `;
  
//   const OptionButton = styled.Button`
//     padding: 8px 16px;
//     border: none;
//     border-radius: 4px;
//     background-color: #007bff;
//     color: #fff;
//     cursor: pointer;
//   `;
  
//   const SuggestRestaurantScreen = () => {
//     const handleOptionClick = (optionId: string) => {
//       preferences.forEach((option) => {
//         if (option.id === optionId) {
//           option.checked = !option.checked;
//         }
//       });
//     };
  
//     const handleSubmit = () => {
//       console.log('Preferences:', preferences);
//     };
  
//     return (
//       <View>
  
//         {preferences.map((option) => (
//           <Question key={option.id}>
//             <QuestionText>{option.label}</QuestionText>
//             <RadioButton
//               onPress={() => handleOptionClick(option.id)}
//               style={option.checked ? { backgroundColor: '#0069d9' } : {}}
//             >
//               {option.checked ? 'Yes' : 'No'}
//             </RadioButton>
//           </Question>
//         ))}
  
//         <Button title="Submit" onPress={handleSubmit} />
//       </View>
//     );
//   };
  
//   export default SuggestRestaurantScreen;