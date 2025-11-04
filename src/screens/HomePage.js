import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CustomButton } from '../components/';

const HomePage = () => {

    const [data, setData] = useState([]);

    const sendData = async () => {
        try {
            const docRef = await addDoc(collection(db, "Lessons"), {
                name: "React Native",
                description: "Learn React Native basics",
                points: 100

            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const getData = async () => {
        
        const querySnapshot = await getDocs(collection(db, "Lessons"));
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            setData([...data, doc.data()])
        }); 
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
            <Text>Home Page</Text>
            <CustomButton 
                buttonText="Save"
                handleOnPress={sendData}
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
    );
}


export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
