import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Header, FlatList, ScrollView } from 'react-native'
import { auth } from '../firebase'
import axios from 'axios'
import { ListItem } from 'react-native-elements'


const HomeScreen = () => {
  const navigation = useNavigation()

       

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  // const handleSumemer = () => {
  //   navigation.replace("Summer")
  // }
  

  return (
    <View style={styles.container}>
      {/* {displayRecipe(recipes)} */}
      {/* <ScrollView>
        {
          recipes.map(item => (
            <View key={item.name}>
              <Text>{item?.name}</Text>
             </View>
          ))}
      </ScrollView> */}
       <TouchableOpacity
        onPress={() => {
          navigation.replace("Add Recipe")
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => {
            navigation.replace("Spring")
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Spring</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Summer")
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Summer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Autumn")
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Autumn</Text>
        </TouchableOpacity>
      <TouchableOpacity
          onPress={() => {
            navigation.replace("Winter")
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Winter</Text>
        </TouchableOpacity>
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