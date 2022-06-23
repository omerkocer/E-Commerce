import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRef } from 'react';


const FilterModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const modal = useRef(null);
  const openModal = () =>{
    modal.current.onRequestClose();
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        ref={modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            <AntDesign style={styles.buttonClose}
            name="closecircle" 
            size={28} 
            color="black"
            onPress={() => setModalVisible(!modalVisible)} />
            <View style={styles.modalView}/>

        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    flex:0.8,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    padding: 10,
  },
  buttonClose: {
      alignSelf:"center",
    backgroundColor: '#2196F3',
  },
  textStyle: {
    alignSelf:"flex-start",
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default FilterModal;