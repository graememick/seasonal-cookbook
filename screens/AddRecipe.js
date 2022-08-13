import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, ScrollView, Alert } from 'react-native'
import { auth } from '../firebase'
import axios from 'axios'
import RNPickerSelect from "react-native-picker-select";
import moment from 'moment'; 
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";






const AddRecipe = () => {
    const navigation = useNavigation()
    const [recipeName, setRecipeName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [season, setSeason] = useState("")
    const [uploading, setUploading] = useState(false)
    const [imageURI, setImageURI] = useState("")

  
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
        entry_created: currentDate,
        images_url: imageURI
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
  
      const chooseImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        
        handleImagePicked(pickerResult);
      };

    const handleImagePicked = async (pickerResult) => {
      try {
        setUploading(true);
  
        if (!pickerResult.cancelled) {
          const uploadUrl = await uploadImage(pickerResult.uri);
          setImageURI(uploadUrl);
          Alert.alert("Photo succesfully uploaded")
        }
      } catch (err) {
        console.log(err);
        alert("Upload failed, sorry :(");
      } finally {
        setUploading(false);
      }
    };

    async function uploadImage (uri) {
      // Why are we using XMLHttpRequest? See:
      // https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    
      const fileRef = ref(getStorage(), uuid.v4());
      await uploadBytes(fileRef, blob);
    
      // We're done with the blob, close and release it
      blob.close();
    
      const downURL = await getDownloadURL(fileRef);
      return downURL
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
      <Button title="Add image" onPress={chooseImage} />
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