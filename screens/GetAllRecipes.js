import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Header, FlatList, ScrollView } from 'react-native'
import { auth } from '../firebase'
import axios from 'axios'
import { ListItem } from 'react-native-elements'

const GetAllRecipes = () => {
    const navigation = useNavigation()
    const [recipes, setRecipes] = useState([{name: "tofu", description: "food"},{name: "rice", description: "food"}])

    useEffect(() => {
      axios
        .get("https://seasonal-cookbook.herokuapp.com/api/recipes/Pot-au-feu")
        .then((response) => {
          setRecipes([response.data])
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
  
    const displayRecipe = (recipes) => {
        return (
            <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View key={item.name}>
                <Text>{item?.name}</Text>
               </View>
              // <ListItem
              // title={`${item.name}`}
              // subtitle={`${item.description}`}
              // onPress={() => { }}
              // />
            );
          }
        }
        />
        );
      }

  return (
    <View style={styles.container}>
      {displayRecipe(recipes)}
      {/* <ScrollView>
        {
          recipes.map(item => (
            <View key={item.name}>
              <Text>{item?.name}</Text>
             </View>
          ))}
      </ScrollView> */}
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GetAllRecipes

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