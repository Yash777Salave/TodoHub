import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getTodo} from '../componants/TodoApiServices';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [page, setPage] = useState(0);
  const [todo, setTodo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

  const fetchTodo = async () => {
    try {
      const newTodo = await getTodo(10, page * 10);
      console.log('Fetched new todos: ', newTodo);
      setTodo(prevTodo => [...prevTodo, ...newTodo]);
    } catch (error) {
      console.log('Error fetching todo is - ', error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [page]);

  useEffect(() => {
    console.log('Updated todo data:', todo);
  }, [todo]);

  const filteredTodos = todo.filter(todo =>
    todo.todo.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile');
        }}
        style={styles.userImageContainer}>
        <Image
          source={require('../assets/user.png')}
          style={styles.userImage}
        />
      </TouchableOpacity>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Search"
          style={styles.InputBox}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredTodos}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text style={styles.title}>{item.todo}</Text>
            <Text style={styles.status}>
              {item.completed ? '✅ Completed' : '❌ Not Completed'}
            </Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    // position: 'relative',
  },
  InputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  InputBox: {
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  container: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  status: {
    fontSize: 14,
    marginVertical: 5,
    color: '#666',
  },
  userImageContainer: {
    margin: 10,
    // position: 'absolute',
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  userImage: {
    height: 50,
    width: 50,
    alignSelf: 'flex-end',
    right: 20,
  },
});
