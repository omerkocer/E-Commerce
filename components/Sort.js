import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Sorted(props) {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  
  if (isChecked1) {
    props.itemsDataRef.sort(function(a, b){
      return a.price - b.price;
    });
    setTimeout(() => {
      props.closeModal()
    }, 50); 
  }else if(isChecked2){
    props.itemsDataRef.sort(function(a, b){
      return b.price - a.price;
    });
    setTimeout(() => {
      props.closeModal()
    }, 50); 
  }else if (isChecked3){
    props.itemsDataRef.sort(function(a, b){
      return b.stock - a.stock;
    });
    setTimeout(() => {
      props.closeModal()
    }, 50); 
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{
          setChecked1(!isChecked1)
          }}>
        <View style={styles.section}>
            <Checkbox 
            style={styles.checkbox} 
            value={isChecked1}
            onValueChange={setChecked1}
            color={isChecked1 ? 'black' : undefined}
            />
            <Text style={styles.paragraph}> Fiyata Göre (Önce en düşük)</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          setChecked2(!isChecked2)
          }}>
            <View style={styles.section} >
                <Checkbox
                style={styles.checkbox} 
                value={isChecked2}
                onValueChange={setChecked2}
                color={isChecked2 ? 'black' : undefined}
                />
                <Text style={styles.paragraph}>Fiyata Göre (Önce en yüksek)</Text>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={()=>
            {setChecked3(!isChecked3)}}
            >
            <View style={styles.section} >
                <Checkbox
                style={styles.checkbox} 
                value={isChecked3}
                onValueChange={setChecked3}
                color={isChecked3 ? 'black' : undefined}
                />
                <Text style={styles.paragraph}>Tarihe Göre (Önce en yeni)</Text>
            </View>
        </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    borderRadius:15,
    margin: 8,
  },
});