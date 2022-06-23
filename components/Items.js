import React from "react";
import { View, Text,StyleSheet, TouchableOpacity,Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/dana.jpg"
import { useNavigation } from "@react-navigation/native";
import { subData } from "../git_ignore_files/firebase";
const Items = (props) => {
    const navigation = useNavigation();
    const id = props.id
    
    
    return (
        <TouchableOpacity 
            style = {styles.item}
            onPress={() => {
                //console.log(id);
                navigation.navigate('ItemsPage', {
                    itemId: id,
                    stock : props.stock,
                    price: props.price,
                    genus: props.genus,
                    kilos: props.kilos,
                    age: props.age
                })
              }}>
                <View style={styles.itemLeft}>
                    <Image resizeMethod="scale" resizeMode="stretch" source={logo} style={styles.pictures}/>
                    <View style={{ flexDirection:"column" }}>
                        <Text style={styles.nameText}>Hayvan Sahibi:</Text>
                        <Text style={styles.nameText}>{props.name}</Text>
                        <Text style={styles.descriptionText}>Hayvan Cinsi: {props.genus}</Text>
                    </View>
                </View>
                <View style={styles.sharesText}>
                    <Text style={{ color:"#189405" }}>{props.adet}Hisse Adedi:{props.stock}</Text>
                    <Text style={{ color:"#3878B7" }}>Hisse Fiyatı: {props.price} TL</Text>
                </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item:{
        flex:1,
        backgroundColor:"#FFFF",
        padding:5,
        borderRadius:20,
        marginBottom:5,
        margin:5,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    direction:{
        justifyContent:"center",
        
    },
    itemLeft:{      
        flex:3,  
        flexDirection:"row",
        alignItems:"center",
        flexWrap:"wrap",
       // maxWidth:"80%",
    },
    pictures:{
        width:100,
        height:66,
        backgroundColor:"#000",
        marginLeft:5
    },
    nameText:{
        fontSize:12,
        marginLeft:10,
        color:"#000",
        fontStyle:"italic",
        fontWeight:"bold",
        maxWidth:"90%",
    },
    descriptionText:{
        color:"#000",
        marginLeft:8
    },
    sharesText:{
        flex:1,
        justifyContent:"flex-end",
        marginRight:10,
        alignItems:"center"
    }
})

export default Items;