import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Header, FlatList, ScrollView } from 'react-native'
import { auth } from '../firebase'
import axios from 'axios'
import { ListItem } from 'react-native-elements'


const HomeScreen = () => {
  const navigation = useNavigation()
  const [recipes, setRecipes] = useState([{name: "tofu", description: "food"},{name: "rice", description: "food"}])

  useEffect(() => {
    axios
      .get("https://seasonal-cookbook.herokuapp.com/api/recipes/Pot-au-feu")
      .then((response) => {
        setRecipes([response.data])
      });
  }, []);

  // const displayRecipe = (recipesList) => {
  //     return (
  //       <FlatList
  //       ItemSeparatorComponent={() => <View style={styles.separator} />}
  //       data={recipesList}
  //       keyExtractor={(item, index) => index.toString()}
  //       renderItem={({item}) => {
  //         return (
  //           <ListItem
  //           title={`${item.name}`}
  //           subtitle={`${item.description}`}
  //           onPress={() => { }}
  //           />
  //         );
  //       }
  //     }
  //     />
  //     );
  //   }
       

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
      <Text>recipes: {recipes[0].name}</Text>
      <ScrollView>
        {
          recipes.map(item => (
            // <View key={item.name}>
              <text>{item?.name}</text>
            // </View>
          ))}
      </ScrollView>
      {/* <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity> */}
    </View>
  )
}

export default HomeScreen

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