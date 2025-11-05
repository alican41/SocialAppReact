import React, {useState, useEffect, use} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CustomButton } from '../components/';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { current } from '@reduxjs/toolkit';

const HomePage = () => {

    const [data, setData] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    //console.log("data: ", data);

    useEffect(() => {
        getData();
    }, [isSaved])

    const sendData = async () => {
        try {
            const docRef = await addDoc(collection(db, "Lessons"), {
                name: "React Native",
                description: "Learn React Native basics",
                points: 105

            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const getData = async () => {
        const allData = []

        try {
            const querySnapshot = await getDocs(collection(db, "Lessons"));
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                allData.push({...doc.data(), id: doc.id});
        }); 
        setData(allData)
        } catch (error) {
            console.log(error)
        }
        
        
    }

    const deleteData=async(id)=>{
        try {
            await deleteDoc(doc(db, "Lessons", id));

            setData(currentData => currentData.filter(item => item.id !== id));

        } catch (error) {
            console.log(error)
        }
        
    }

    const updateData=async()=>{
        try {
            const lessonData = doc(db, "Lessons", "NRPhuJ0bUqd36q0UUoTB");
            await updateDoc(lessonData, {
                points: 150
            })
        } catch (error) {
            console.log("HomePage line 42: ", error);
        }
    }



    return (
        <View style ={styles.container}>
            
            <ScrollView style={styles.scrollableList}>
                {data.map((item) => (
                    <View key={item.id} style={styles.listItem}>
                        
                        <View style={styles.itemContent}>
                            <Text>Name: {item.name}</Text>
                            <Text>Description: {item.description}</Text>
                            <Text>Points: {item.points}</Text>
                        </View>

                        <TouchableOpacity 
                            onPress={() => deleteData(item.id)}
                            style={styles.deleteButton}
                        >
                            <Icon name="delete" size={24} color="#E53935" /> 
                        </TouchableOpacity>

                    </View>
                ))}
            </ScrollView>
            
            <View style={styles.buttonContainer}>
                <CustomButton 
                    buttonText="Save"
                    handleOnPress={() => {sendData, setIsSaved(!isSaved)}}
                />
                <CustomButton 
                    buttonText="Get Data"
                    handleOnPress={getData}
                />
                <CustomButton 
                    buttonText="Delete Data"
                    handleOnPress={deleteData}
                />
                <CustomButton 
                    buttonText="Update Data"
                    handleOnPress={updateData}
                />
            </View>        
            
        </View>
    );
}


export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    scrollableList: {
        paddingTop: 20,
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',
    },
    listItem: {
        marginBottom: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    buttonContainer: {
        paddingTop: 10,
        width: '100%',
        marginBottom: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContent: {
        flex: 1,
        marginRight: 10,
    },
    deleteButton: {
        padding: 5
    }


})
