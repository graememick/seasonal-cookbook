import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, ScrollView } from 'react-native'
import { auth } from '../firebase'
import axios from 'axios'
import { ListItem } from 'react-native-elements'
import RNPickerSelect from "react-native-picker-select";
import moment from 'moment'; 



const AddRecipe = () => {
    const navigation = useNavigation()
    const [recipeName, setRecipeName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [season, setSeason] = useState("")

  
    const currentDate = moment().format("YYYY/MM/DD");

    let userId = auth.currentUser?.uid


    const handleSubmission = () => {
      axios
      .post("https://seasonal-cookbook.herokuapp.com/api/recipes/",{
        user_id: userId,
        name: recipeName,
        description: description,
        intructions: instructions,
        season: season,
        entry_created: currentDate
      })
      .then(function (response) {
        alert(`Recipe for ${recipeName} has been submitted`)
        navigation.replace("Home")
      })
     .catch(function (error) {
        console.log(error);
      });
      ;
      }


    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
        }
  
  return (
    <View style={styles.container}>
      <Text>Add Recipe</Text>
      <TextInput
      placeholder="Recipe Name"
      // value={name}
      onChangeText={((text) => setRecipeName(text))}
      />
      <TextInput
      placeholder="Description"
      // value={name}
      onChangeText={((text) => setDescription(text))}
      />
       <TextInput
      placeholder="Instructions"
      // value={name}
      onChangeText={((text) => setInstructions(text))}
      />
      <Text>Seasons:</Text>
      <RNPickerSelect
                 onValueChange={(value) => setSeason(value)}
                 items={[
                     { label: "Spring", value: "Spring" },
                     { label: "Summer", value: "Summer" },
                     { label: "Autumn", value: "Autumn" },
                     { label: "Winter", value: "Winter" },
                     { label: "All Seasons", value: "All Seasons" }

                 ]}
             />
        <TouchableOpacity
        onPress={handleSubmission}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Submit Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => {
            navigation.replace("Home")
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddRecipe

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
     button: {
      backgroundColor: '#ffde17',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: '#be1e2d',
      fontWeight: '700',
      fontSize: 16,
    },
    heading: {
  
    },
    separator: {
      height: 1,
      backgroundColor: "grey"
    },
  })