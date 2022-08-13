import { useNavigation} from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Header, FlatList, ScrollView } from 'react-native'
import { auth } from '../firebase'
import axios from 'axios'
import { useRoute } from '@react-navigation/core'


const ShowRecipe = () => {
    const navigation = useNavigation()
    const [recipe, setRecipe] = useState([])
    const [imageUrl, setImageUrl] = useState("")
    const route = useRoute();

    useEffect(() => {
      axios
        .get(`https://seasonal-cookbook.herokuapp.com/api/recipes/${route.params.recipeName}`)
        .then((response) => {
          setRecipe(response.data)
          setImageUrl(response.data.images_url)
        });
    }, []);

    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
        }
  
    const displayRecipe = (recipe) => {
        return (
            <View >
                <Image
      style={{width: 100, height: 100}}
      source={{uri: imageUrl ? imageUrl : null}}
    />
                <Text  >Recipe: {recipe.name}</Text>
                <Text  >Description: {recipe.description}</Text>
                <Text >Instructions: {recipe.intructions}</Text>
                <Text  > style={styles.text} Season: {recipe.season}</Text>
               </View>
            );
        };

  return (
    <View style={styles.container}>
      {displayRecipe(recipe)}
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

export default ShowRecipe

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
    recipeButton: {
      backgroundColor: '#white',
      width: '80%',
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 5,
    }
  })