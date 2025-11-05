import React, {useState, useEffect, use} from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CustomButton } from '../components/';

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
                allData.push(doc.data());
        }); 
        setData(allData)
        } catch (error) {
            console.log(error)
        }
        
        
    }

    const deleteData=async()=>{
        await deleteDoc(doc(db, "Lessons", "0zMYge6gDlvEiwUe0fwK"));
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
                {data.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                        <Text>Name: {item.name}</Text>
                        <Text>Description: {item.description}</Text>
                        <Text>Points: {item.points}</Text>
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
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    buttonContainer: {
        paddingTop: 10,
        width: '100%',
        marginBottom: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }


})
