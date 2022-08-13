import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { auth } from '../firebase'
import axios from 'axios'

const Winter = () => {
    const navigation = useNavigation()
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
      axios
        .get("https://seasonal-cookbook.herokuapp.com/api/recipes/")
        .then((response) => {
          const recipes = 
            response.data.filter((recipe) =>  (recipe.user_id === auth.currentUser?.uid && recipe.season === "Winter" || recipe.season === "All Seasons"));
          setRecipes(recipes)
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

        const handleShowRecipe = (recipeName) => {
              navigation.replace("Recipe",{
recipeName              })
        
          }
  
    const displayRecipe = (recipes) => {
        return (
            <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={recipes}
          keyExtractor={(recipe, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View key={item.name}>

              <TouchableOpacity
                  onPress={() => {
                    handleShowRecipe(item.name)
                  }}
                  style={styles.recipeButton}
                >
                <Text>Recipe: {item.name}</Text>
                <Text>Description: {item.description}</Text>
                </TouchableOpacity>
               </View>
            );
          }
        }
        />
        );
      }

  return (
    <View style={styles.container}>
      {displayRecipe(recipes)}
      <Text>Email: {auth.currentUser?.email}</Text>
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

export default Winter

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