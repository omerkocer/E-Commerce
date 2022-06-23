import React, { useState} from "react";
import { 
  Text, 
  StyleSheet, 
  View, 
  ScrollView,
TouchableOpacity,
Modal} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Items from "../components/Items";
import { dbListener, subData} from "../git_ignore_files/firebase";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import Sorted from "../components/Sort";
import Filter from './../components/Filter';

export const postIdArray = []
const Home = () => {
  var itemsDataRef = dbListener();
  const closeModal = () =>{
    setModalVisible(false);
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("filter");

  const ModalsInside = () =>{
    if (modalContent=="sort"){
      return <Sorted itemsDataRef={itemsDataRef} closeModal={closeModal}/>;
    } else if (modalContent=="filter"){
      return <Filter/>;
    }
  }
  
    itemsDataRef.map((post) => postIdArray.push((post)));
// postIdArray.forEach(id => subData(id))
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          //ref={modal}
          animationType= "slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <TouchableOpacity
                hitSlop={20}
                onPress={() => setModalVisible(!modalVisible)} >
              <AntDesign style={styles.buttonClose}
                name="closecircle" 
                size={30} 
                color="black"/>
            </TouchableOpacity>
            <View style={styles.modalView}>
              <ModalsInside/>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerItems}
          onPress={() => {
            setModalVisible(true)
            setModalContent("filter")} }>
            <Text style={{ fontWeight:"bold", alignSelf:"center"}}>Satıcı Ara</Text>
            <MaterialIcons name="person-search" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style= {styles.headerItems}
          onPress = {()=> {
            setModalVisible(true)
            setModalContent("sort")
          }}>
          <FontAwesome name="sort" size={30} color="black" />
          <Text style={{ fontWeight:"bold" , alignSelf:"center"}}>İlanları Sırala</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.product}>
        {itemsDataRef.map((post) =>(
          <Items
          key={post.id}
          id = {post.id}
          name={post.owner}
          price={post.price}
          stock={post.stock}
          genus ={post.genus}
          kilos = {post.kilos}
          age = {post.age}
          />
          ))
          }   
        </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header:{
    flex:1,
    marginTop:-15,
    margin:5,
    marginBottom:10,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  headerItems:{
      flexDirection :"row",
      margin:1,
      borderWidth:0.2,
      borderRadius:5,
      borderColor:"#ecf0f1",
      flex:1,
      justifyContent:"space-evenly",
  },
  product:{
    padding:5,
    flex:2,
    borderTopWidth:0,
    borderWidth:0.2,
    backgroundColor:"beige",
    justifyContent:"flex-start",
  },
  container: {
    flex: 4,
    flexDirection:"column"
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
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
    marginTop:25,
    marginStart:10,
    alignSelf:"flex-start",
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
