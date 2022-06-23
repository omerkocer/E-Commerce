import React from "react";
import { View,StyleSheet,Image, ScrollView,Text, Alert, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SheepPic from "../assets/seep.jpg"

const image = SheepPic;
const sayi = (true)

const ShareDisable = (props)=>{
    const itemId = JSON.stringify(props.data.id);
    const datahid = JSON.stringify(props.data.hid);

    const createAlert = () =>
    Alert.alert('Bu hisse dolu!', `Hisse Sahibinin Numarası: ${datahid}`, 
    [
      
      { text: 'Tamam', 
        onPress: () => console.log('OK Pressed'), },
      
    ]);
    return(
    <View style= {styles.container}>
        <TouchableOpacity 
            style={sayi ? styles.borderDisable : styles.borderEnable}
            onPress={()=>{
                createAlert();
            }}>
            <Image source={image} resizeMethod="scale" resizeMode="stretch" style={styles.picture}/>
            <Text style={styles.textD}> DOLU HİSSE</Text>
        </TouchableOpacity>
    </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flexDirection:"column"
    },
    textD:{
        backgroundColor:"red",
        padding:1
    },
    container:{
        justifyContent:"space-evenly",
        flexDirection:"row",
        backgroundColor:"#ffff",
        padding:20,
        flex:1
    },
    picture:{
        height:100,
        width:110,
        borderWidth:25,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    borderDisable:{
        borderRadius:25,
        borderWidth:8,
        borderColor:"red"
    },
})
export default ShareDisable;