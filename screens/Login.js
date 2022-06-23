import React, {useState,useEffect} from "react";
import { View,StyleSheet,Image,
    KeyboardAvoidingView, ScrollView, ImageComponent,Text} from "react-native";
import { TextInput, VStack, Button, HStack } from "@react-native-material/core";
import {SafeAreaView} from 'react-native-safe-area-context';
import { auth } from "../git_ignore_files/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
const Login = ({navigation}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[loading] = useState(true);

    const SignIn = () =>(
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in             
            navigation.navigate('Home')
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/wrong-password") {
                alert("Hatalı Şifre Girişi")                
            }else{
                alert(errorCode)
            }
            const errorMessage = error.message;
            // ..
        })
    );
    
return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
            <Image style={styles.logo} source={require('../assets/ciftlik.jpg')}/>
            <Text style={styles.title}>Giriş yap </Text>
            <VStack spacing={10}>
                <TextInput style={{ padding:5 , marginHorizontal:20}} label="E-Posta Adresi / Kullanıcı Adı" variant="outlined"
                    color="orange"
                    value={email}
                    onChangeText={text => setEmail(text)}/>
                <TextInput
                    style={{ padding:5, marginHorizontal:20 }} label="Parola" uppercase={false} secureTextEntry={true}
                    variant="outlined"
                    value={password}
                    color="orange"
                    onChangeText={text => setPassword(text)}/>
                <HStack justify="space-between">
                    <Button color="orange" style={{ padding:2, marginHorizontal:20 }} title="Giriş Yap" uppercase={false}
                        variant="contained"
                        trailing={<AntDesign name="login" size={20} color="black" />}
                        onPress={() => {
                            SignIn()
                            Button.loading={loading}
                            Button.loadingIndicatorPosition="trailing"                
                        }}/>
                    <Button
                        style={{ padding:2, marginHorizontal:20,borderWidth:2,borderColor:"orange" }} title="Kayıt ol"
                        color="black"
                        uppercase={false}
                        variant="text"
                        trailing = {<AntDesign name="adduser" size={24} color="black" />}
                        onPress={() => {
                            navigation.navigate("SignUpScreen")                        
                        }}
                    />
                    </HStack>
                </VStack>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create ({
    container:{
        flex:1,
    },
    title:{
        marginTop:36,
        marginBottom:30,
        marginLeft:10,
        fontSize:26,
        fontWeight:'bold',
        color:'#525252',
    },
    logo:{
        flex:0.3,
        marginTop: 30,
        alignSelf:"center",
        height:200,
        width: 300
    }
}
)