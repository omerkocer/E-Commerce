import React, { useState, useEffect } from "react";
import { View,StyleSheet,Image, ScrollView,Text, Pressable, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SheepPic from "../assets/seep.jpg"
import { useNavigation } from '@react-navigation/native';
import { subData } from "../git_ignore_files/firebase";
import ShareDisable from './ShareDisable';
import ShareEnable from './ShareEnable';
import { db } from '../git_ignore_files/firebase';
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";


const image = SheepPic;
const sayi = (true)

const ShareHandler = (props)=>{
    const [hisse, setHisse] = useState([])

    const itemId = JSON.stringify(props.data.id);
    const datahid = JSON.stringify(props.data.hid);
    const navigation= useNavigation();
    var sliceId = itemId.slice(3,23);
    console.log(sliceId)
    //csubData(sliceId)
    useEffect(() => {
        console.log("asd");
        
        const unsub = onSnapshot(
            doc(db, "Items", sliceId), 
            { includeMetadataChanges: true }, 
            (doc) => {
                //console.log(doc.data());
                setHisse(doc.data()?.hisseler)
            }
        );
    }, []);
    
    console.log('====================================');
    console.log(hisse);
    console.log('====================================');
    if(hisse){
        if(hisse['hisse'+datahid]){
            return(<ShareDisable data={props.data} key={"asd"+datahid}/>)
        }else{
            return(
                <ShareEnable  data={props.data} key={"asd"+datahid}/>
            )
        }
    }
    else
        return null;
}

export default ShareHandler;