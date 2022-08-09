import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native-web'

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
    style={styles.container}
    >
        <text>
            Login Test
        </text>

    </KeyboardAvoidingView>
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding"
    // >
    //   <View style={styles.inputContainer}>
    //     <TextInput
    //       placeholder="Email"
    //       value={email}
    //       onChangeText={text => setEmail(text)}
    //       style={styles.input}
    //     />
    //     <TextInput
    //       placeholder="Password"
    //       value={password}
    //       onChangeText={text => setPassword(text)}
    //       style={styles.input}
    //       secureTextEntry
    //     />
    //   </View>

    //   <View style={styles.buttonContainer}>
    //     <TouchableOpacity
    //       onPress={handleLogin}
    //       style={styles.button}
    //     >
    //       <Text style={styles.buttonText}>Login</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       onPress={handleSignUp}
    //       style={[styles.button, styles.buttonOutline]}
    //     >
    //       <Text style={styles.buttonOutlineText}>Register</Text>
    //     </TouchableOpacity>
    //   </View>
    // </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})