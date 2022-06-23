import React, {useState} from "react";
import { StyleSheet,Image,
    KeyboardAvoidingView, ScrollView,Text} from "react-native";
import { TextInput, VStack, Button, HStack } from "@react-native-material/core";
import {SafeAreaView} from 'react-native-safe-area-context';
import { auth } from "../git_ignore_files/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
const SignUpScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const[loading] = useState(true);

    const SignUp = (name) =>(
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Kayit olundu");
            navigation.navigate('Home')
            const user = userCredential.user;
            user.displayName= name
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                alert("Bu mail adresi kullanımda")                
            }else{
                alert(errorCode)
            }
            const errorMessage = error.message;
            // ..
        })
    );

    return (
    <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView>
                <Image style={styles.logo} source={require('../assets/ciftlik.jpg')}/>
                <Text style={styles.title}> Kayıt Ol </Text>
                <VStack spacing={10}>
                <TextInput label="Ad - Soyad" variant="outlined" color="orange" value={name}
                        onChangeText={text => setName(text)}
                    />
                    <TextInput label="E-Posta Adresi / Kullanıcı Adı" variant="outlined" color="orange" value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput label="Parola" color="orange" uppercase={false} variant="outlined" value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <HStack justify="space-between">
                        <Button title="Kayıt ol" uppercase={false} color="orange" trailing = {<AntDesign name="adduser" size={24} color="black" />}
                            onPress={() => {
                                SignUp(name)
                                Button.loading={loading}
                                Button.loadingIndicatorPosition="trailing"                           
                            }}
                        />
                        <Button style = {styles.borderbutton} title="Giriş Yap" uppercase={false} color="black"
                            trailing={<AntDesign name="login" size={24} color="black" />}
                            variant="outlined"
                            onPress={() => {
                                navigation.navigate("Login")             
                            }}
                        />
                    </HStack>
                </VStack>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create ({
    container:{
        flex:1,
        padding:20
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
    },
    borderbutton:{
        borderWidth:2,
        borderColor:"orange"
    }
}
)