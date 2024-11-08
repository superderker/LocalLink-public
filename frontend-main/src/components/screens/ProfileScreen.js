import React, { useState , useEffect} from 'react';
import { Modal, Text,ImageBackground, View, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or 'react-native-vector-icons/Ionicons' for bare React Native

const profileImg = require("../../assets/images/profile1.png");


export function ProfileScreen({ navigation }) {
    const [name, setName] = useState('David Welzien');
    const [age, setAge] = useState('21');
    const [bio, setBio] = useState('Jag älskar krov med lite ketchup på :) Säg till om ni vill grilla lite');
    const [interests, setInterests] = useState(['Reading', 'Gaming', 'Hiking', 'Grilla', 'Korv']);
    const [modalVisible, setModalVisible] = useState(false);
    const [newInterest, setNewInterest] = useState('');
    const [bioModalVisible, setBioModalVisible] = useState(false);
    const [editedBio, setEditedBio] = useState('');
    const [editedName, setEditedName] = useState(name);
    const [nameModalVisible, setNameModalVisible] = useState(false);
    const [editedAge, setEditedAge] = useState(age);
    const [ageModalVisible, setAgeModalVisible] = useState(false);

    useEffect(() => {
        // Load the user's data here, e.g. from an API or local storage
        // setName(user.name);
        // setBio(user.bio);
        // setInterests(user.interests);
    }, []);

    const handleInterestToggle = (interest) => {
        // Add or remove interest from the state
        setInterests(interests.includes(interest)
            ? interests.filter(i => i !== interest)
            : [...interests, interest]);
    };

    const handleSave = () => {
        // Implement the save functionality
        // For now, just logs to the console
        console.log('Saving', { name, bio, interests });
    };

    const addInterest = () => {
        if (newInterest && !interests.includes(newInterest)) {
            setInterests([...interests, newInterest.trim()]);
            setNewInterest('');
            setModalVisible(false);
        }
    };

    const handleSaveBio = () => {
        setBio(editedBio.trim());
        setBioModalVisible(false);
    };

    const handleSaveName = () => {
        setName(editedName);
        setNameModalVisible(false);
    };
    
    const handleSaveAge = () => {
        setAge(editedAge);
        setAgeModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                <Ionicons name="close-circle" size={30} color="grey" />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.rightCircle}>
                <ImageBackground
                    source={profileImg}
                    style={ {
                    width: '100%', // Adjust the width to make it slightly smaller
                    height: '90%', // Adjust the height to make it slightly smaller
                    }}
                >
                </ImageBackground>
            </TouchableOpacity>            

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TouchableOpacity onPress={() => setNameModalVisible(true)} style={styles.editWrapper}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>Name</Text>
                                <Ionicons name="create-outline" size={20} color="grey" />
                            </View>
                            <Text style={styles.input}>{name}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                    <TouchableOpacity onPress={() => setAgeModalVisible(true)} style={styles.editWrapper}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>Age</Text>
                                <Ionicons name="create-outline" size={20} color="grey" />
                            </View>
                            <Text style={styles.input}>{age}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={nameModalVisible}
                onRequestClose={() => {
                    setNameModalVisible(!nameModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.label}>Change Name</Text>
                        <TextInput
                            autoFocus={true}
                            placeholder="Enter your name"
                            value={editedName}
                            onChangeText={setEditedName}
                            style={styles.modalTextInput}
                        />
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.buttonClose} onPress={() => setNameModalVisible(false)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSave} onPress={handleSaveName}>
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={ageModalVisible}
                onRequestClose={() => {
                    setAgeModalVisible(!ageModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.label}>Change Age</Text>
                        <TextInput
                            autoFocus={true}
                            placeholder="Enter your age"
                            value={editedAge}
                            onChangeText={setEditedAge}
                            style={styles.modalTextInput}
                            keyboardType="numeric"
                        />
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.buttonClose} onPress={() => setAgeModalVisible(false)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSave} onPress={handleSaveAge}>
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <View style={styles.bioContainer}>
                <View style={styles.bioHeader}>
                    <Text style={styles.bioLabel}>Bio</Text>
                    <TouchableOpacity onPress={() => { setEditedBio(bio); setBioModalVisible(true); }}>
                        <Ionicons name="create-outline" size={24} color="grey" style={styles.editIcon} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.bioText}>{bio}</Text> 
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={bioModalVisible}
                onRequestClose={() => {
                    setBioModalVisible(!bioModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.bioLabel}>Change Bio</Text>
                        <TextInput
                            autoFocus={true}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Tell us about yourself"
                            value={editedBio}
                            onChangeText={setEditedBio}
                            style={styles.modalTextInput}
                            textAlignVertical="top" // Set textAlignVertical to 'top'
                            maxHeight={200} // Set a maximum height for the text input
                            scrollEnabled={true} // Enable scrolling when the content exceeds maxHeight
                        />
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.buttonClose} onPress={() => setBioModalVisible(false)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSave} onPress={handleSaveBio}>
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
            


            {/* Interest tags */}
            <View style={styles.interestsContainer}>
                {interests.map((interest, index) => (
                    <TouchableOpacity key={index} style={styles.interestButton} onPress={() => handleInterestToggle(interest)}>
                        <Text style={styles.interestText}>{interest}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addInterestButton}>
                <Ionicons name="add-circle-outline" size={40} color="blue" />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.bioLabel}>Add Interest</Text>
                        <TextInput
                            autoFocus={true}
                            placeholder="Add new interest"
                            value={newInterest}
                            onChangeText={setNewInterest}
                            style={styles.modalText}
                        />
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonSave} onPress={addInterest}>
                                <Text style={styles.textStyle}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212', //spt
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      zIndex: 10,
    },
    profilePic: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignSelf: 'center',
      marginTop: 100,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#333333',
    },
    nameAgeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      marginBottom: 10,
    },
    input: {
      fontSize: 18,//actually here
      width: 150,
      backgroundColor: '#333333',
      borderRadius: 10,
      color: '#FFFFFF',
      padding: 10,
    },
    nameInput: {
      marginRight: 10,
    },
    ageInput: {
      marginLeft: 10,
    },
    inputContainer: {
      marginTop: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      alignSelf: 'center',
      marginBottom: 10,
    },
    inputWrapper: {
      flex: 2,
      marginRight: 5,
      justifyContent: 'space-between',
    },
    label: { //here
      fontSize: 18,
      marginBottom: 5,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    bioInput: {
      width: '90%',
      alignSelf: 'center',
      padding: 10,
      fontSize: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#e9b4b4',
      borderRadius: 5,
      textAlignVertical: 'top',
      height: 100,
      color: '#FFFFFF',
      backgroundColor: '#333333',
    },
    interestsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      marginTop: 10,
      marginBottom: 20,
    },
    interestButton: {
      borderWidth: 1,
      borderColor: '#e9b4b4',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      margin: 5,
      backgroundColor: '#121212',
    },
    interestText: {
      fontSize: 16,
      color: '#FFFFFF',
    },
    saveButton: {
      backgroundColor: '#e9b4b4',
      borderRadius: 20,
      width: '90%',
      alignSelf: 'center',
      padding: 15,
      marginTop: 10,
    },
    saveButtonText: {
      fontSize: 18,
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    addInterestButton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: '#121212',
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
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      width: '80%',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#e9b4b4',
      color: '#FFFFFF',
    },
    textStyle: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    bioContainer: {
      marginTop: 20,
      marginLeft: 12,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 10,
      height: 200,
      overflow: 'scroll',
    },
    bioHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    bioLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
      color: '#FFFFFF',
    },
    editIcon: {
      marginLeft: 'auto',
    },
    bioText: {
      fontSize: 16,
      color: '#FFFFFF',
      padding: 10,
      lineHeight: 24,
      textAlign: 'justify',
      flex: 0.8,
      backgroundColor: '#333333',
      borderRadius: 10,
      height: 200,
      overflow: 'scroll',
    },
    editBioButton: {
      marginLeft: 10,
    },
    modalTextInput: {
      backgroundColor: '#333333',
      borderColor: '#e9b4b4',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      width: '90%',
      maxHeight: 200,
      maxWidth: 300,
      color: '#FFFFFF',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      marginTop: 10,
    },
    buttonSave: {
      backgroundColor: '#e9b4b4',
      borderRadius: 20,
      padding: 10,
      flex: 1,
      marginHorizontal: 5,
    },
    buttonClose: {
      backgroundColor: 'red',
      borderRadius: 20,
      padding: 10,
      flex: 1,
      marginHorizontal: 5,
    },
    editWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightCircle: {
      width: '12%',
      height: '12%',
      marginTop: 100,
      marginBottom: 20,
      aspectRatio: 1,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 999,
      marginHorizontal: 10,
      borderWidth: 2,
      borderColor: '#333333',
    },
  });
  

  

// Don't forget to handle the 'handleSave' function
