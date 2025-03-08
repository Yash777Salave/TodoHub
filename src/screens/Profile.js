import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getUser, saveUser} from '../componants/storage';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({username: '', email: ''});

  useEffect(() => {
    const storedUser = getUser('user');
    if (storedUser) {
      setUser(storedUser);
      setEditedUser(storedUser);
    }
  }, []);

  const handleSave = () => {
    if (!editedUser.username || !editedUser.email) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    saveUser('user', editedUser);
    setUser(editedUser);
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Details</Text>

      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        value={editedUser.username}
        editable={isEditing}
        onChangeText={text => setEditedUser({...editedUser, username: text})}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={editedUser.email}
        editable={isEditing}
        onChangeText={text => setEditedUser({...editedUser, email: text})}
      />

      {isEditing ? (
        <TouchableOpacity style={styles.loginButton} onPress={handleSave}>
          <Text style={styles.loginButtonText}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => setIsEditing(true)}>
          <Text style={styles.loginButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#6a11cb',
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
