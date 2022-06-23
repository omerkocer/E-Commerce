import React from "react";
import { View,StyleSheet,Image, ScrollView,Text, Pressable, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SheepPic from "../assets/seep.jpg"
import { useNavigation } from '@react-navigation/native';

const image = SheepPic;
const sayi = (true)

const ShareEnable = (props)=>{
    const itemId = JSON.stringify(props.data.id);
    const datahid = JSON.stringify(props.data.hid);
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity style={sayi ? styles.borderEnable : styles.borderDisable}
                onPress={()=>{ 
                    //alert(datahid);
                    navigation.navigate("HisseAlim" , {datahid : datahid ,itemId : itemId }) 
                }}>
                <Image source={image} resizeMethod="scale" resizeMode="stretch" style={styles.picture}/>
                <Text style={styles.textE}> BOŞ HİSSE</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flexDirection:"column"
    },
    container:{
        justifyContent:"space-evenly",
        flexDirection:"row",
        backgroundColor:"#ffff",
        padding:20,
        borderWidth:0.15,
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
    borderEnable:{
        borderWidth:8,
        borderRadius:25,
        borderColor:"green"
    },
    info:{
        backgroundColor:"yellow"
    },
    textE:{
        backgroundColor:"green",
        padding:1
    },
    back: {
        backgroundColor:"red",
        padding:20,
        borderRadius:20,
    }
})
export default ShareEnable;