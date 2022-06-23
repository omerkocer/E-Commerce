import { useRoute } from "@react-navigation/native";
import React, { Component ,useState,useEffect} from "react";
import { View,StyleSheet,ScrollView,Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SheepPic from "../assets/seep.jpg"
import ShareDisable from "../components/ShareDisable";
import ShareEnable from "../components/ShareHandler";
import { itemsListenerRef } from "../git_ignore_files/firebase";
import ShareHandler from './../components/ShareHandler';

const image = SheepPic;
const ItemsPage = () => {

    //Route ile gelen datalar burada yakalanır.
    const route= useRoute()
    const { itemId,stock,price,genus,kilos,age } = route.params;

    //Veritabanındaki Collectionların parametreleri burada tanımlanır.
    const listId = JSON.stringify(itemId)
    const listStock = parseInt(stock)
    const listPrice = JSON.stringify(price)


    let enableArray = []
        for (let i = 1; i < listStock+1; i=i+2) {
            enableArray.push(
                <View style={{ flexDirection:"row" }}>
                    <ShareHandler key={"asd123"+i} data={{ id:listId, hid:i }}/>
                    {i+1<=listStock && <ShareHandler key={"asd234"+(i+1)} data={{ id:listId, hid:i+1 }}/>}
                </View>
            )
        }
    return(
    <SafeAreaView style={styles.screen} >
        <ScrollView>
            <View style={styles.container}>
                <Text>**HayvanId:{listId} </Text>
                <Text>***Hayvan Hakkında Genel Bilgiler En Alttadır </Text>
            </View>
            <View style={styles.container}>
                {enableArray}
            </View>
            <View style={styles.hakkinda}>
                <Text style={{ alignSelf:"center", fontSize:26,color:"orange" }}>--Hakkında--</Text>
                <Text style={{  fontSize:18, marginLeft:5}}>*Hayvanın Birim Hisse Fiyatı : {listPrice} TL </Text>
                <Text style={{  fontSize:18, marginLeft:5}}>*Hayvanın Cinsi : {genus} </Text>
                <Text style={{  fontSize:18, marginLeft:5}}>*Hayvanın Kilosu : {kilos} kg</Text>
                <Text style={{  fontSize:18, marginLeft:5, marginBottom:"20%"}}>*Hayvanın Yaşı : {age}</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
    
    )};

export default ItemsPage;

const styles = StyleSheet.create({
    screen:{
        flexDirection:"row",
    },
    container1:{
        justifyContent:"space-evenly",
        padding:20,
        backgroundColor:"red",
    },
    container:{
        justifyContent:"space-evenly",
        flexDirection:"column",
        backgroundColor:"#ffff",
        padding:1,
    },
    hakkinda:{
        margin:5,
        backgroundColor:"#ffff",
        borderWidth:0.2,
        borderRadius:5,
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
    },
    back: {
        backgroundColor:"red",
        padding:20,
        borderRadius:20,
    }
})
