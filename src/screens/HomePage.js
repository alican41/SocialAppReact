import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CustomButton } from '../components/';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import Animated, {BounceIn, BounceOut} from 'react-native-reanimated';


const HomePage = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const logoutFunction = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTask, setEditTask] = useState('');
    const [editDeadline, setEditDeadline] = useState('');
    //console.log("data: ", data);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                    <TouchableOpacity onPress={logoutFunction} style={{ marginRight: 15 }}>
                        <FontAwesome5 name="sign-out-alt" size={24} color="#fff" />
                    </TouchableOpacity>
            ),
        });
    }, [navigation, logoutFunction]);

    useEffect(() => {
        getData();
    }, [])

    const addData = async () => {
        try {
            //const newPoints = Number(editPoints)
            const docRef = await addDoc(collection(db, "Tasks"), {
                title: editTitle,
                task: editTask,
                deadline: editDeadline
            });
            const newItem = {
                id: docRef.id,
                title: editTitle,
                task: editTask,
                deadline: editDeadline
            };
            setData(currentData => [...currentData, newItem]);
            handleCancelEdit();
            
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleModalSave = () => {
        if (selectedItem) {
            updateData();
        } else {
            addData();
        }
    }

    const getData = async () => {
        const allData = []

        try {
            const querySnapshot = await getDocs(collection(db, "Tasks"));
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
            await deleteDoc(doc(db, "Tasks", id));

            setData(currentData => currentData.filter(item => item.id !== id));

        } catch (error) {
            console.log(error)
        }
        
    }

    const handleAddPress = () => {
        setSelectedItem(null); // Seçili öğe yok = "Ekle" modu
        setEditTitle('');       // Input'ları boşalt
        setEditTask('');
        setEditDeadline('');
        setIsModalVisible(true); // Modalı aç
    };

    const handleEditPress = (item) => {
        setSelectedItem(item);
        setEditTitle(item.title);
        setEditTask(item.task);
        setEditDeadline(item.deadline);
        setIsModalVisible(true);
    }

    const handleCancelEdit = () => {
        setIsModalVisible(false);
        setSelectedItem(null);
    }

    const updateData=async()=>{

        if (!selectedItem) return;

        try {
            const lessonRef = doc(db, "Tasks", selectedItem.id);
            await updateDoc(lessonRef, {
                title: editTitle,
                task: editTask,
                deadline: editDeadline
            })
            
            setData(currentData => 
                currentData.map(item => 
                    item.id === selectedItem.id 
                ? { ...item, title: editTitle, task: editTask, deadline: editDeadline } 
                : item
            ));

            handleCancelEdit();

        } catch (error) {
            console.log("HomePage line 42: ", error);
        }
    }



    return (
        <View style ={styles.container}>
            
            <ScrollView style={styles.scrollableList}>
                {data.map((item, index) => (
                    <View key={item.id} style={styles.listItem}>
                        
                        <Animated.View 
                            entering={BounceIn.delay(100 * (index) + 1)}
                            exiting={BounceOut.delay(500)}
                            style={styles.itemContent}>
                                <Text>Title: {item.title}</Text>
                                <Text>Mission: {item.task}</Text>
                                <Text>Deadline: {item.deadline}</Text>
                        </Animated.View>

                        <View style={styles.actionButtons}>
                            <TouchableOpacity 
                                onPress={() => deleteData(item.id)}
                                style={styles.iconButton}
                            >
                                <FontAwesome5 name="trash-alt" size={22} color="#E53935" /> 
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleEditPress(item)}
                                style={styles.iconButton}
                            >
                                <FontAwesome5 name="edit" size={22} color="#1E88E5" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true} // Arka plan yarı saydam olsun
                visible={isModalVisible} // Görünürlüğü state'e bağla
                onRequestClose={handleCancelEdit} // Android'de geri tuşuna basınca
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>
                            {selectedItem ? "Edit Task" : "Add New Task"}
                        </Text>
                        
                        <TextInput
                            style={styles.textInput}
                            placeholder="Task Title"
                            value={editTitle}
                            onChangeText={setEditTitle}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Task"
                            value={editTask}
                            onChangeText={setEditTask}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Deadline"
                            value={editDeadline}
                            onChangeText={setEditDeadline}
                            keyboardType="numeric" 
                        />

                        <View style={styles.modalButtonContainer}>
                            <CustomButton
                                buttonText="Cancel"
                                handleOnPress={handleCancelEdit}
                            />
                            <CustomButton
                                buttonText="Save"
                                handleOnPress={handleModalSave}
                            />
                        </View>

                    </View>
                </View>
            </Modal>     
            <TouchableOpacity
                style={styles.fab}
                onPress={handleAddPress} 
            >
                <FontAwesome5 name="plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}


export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    scrollableList: {
        paddingTop: 20,
        marginBottom: 40,
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
    itemContent: {
        flex: 1,
        marginRight: 10,
    },
    actionButtons: {
        flexDirection: 'column',
    },
    iconButton: {
        padding: 8
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center', // Modalı dikeyde ortala
        alignItems: 'center',     // Modalı yatayda ortala
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arka planı karart
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    textInput: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    modalButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'center', 
        itemContents: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 1,
    },
    fab: {
        position: 'absolute', // Ekranın üzerinde serbestçe gezer
        width: 60,
        height: 60,
        borderRadius: 30, // Tam daire yapar (width/2)
        backgroundColor: 'purple', // Ana tema renginiz (veya dilediğiniz renk)
        justifyContent: 'center',
        alignItems: 'center',
        right: 30, // Sağdan 20 piksel
        bottom: 45, // Alttan 20 piksel
        elevation: 15, // Android gölgesi
        shadowColor: '#000', // iOS gölgesi
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    }
})
