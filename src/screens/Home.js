import {StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getTodo} from '../componants/TodoApiServices';

const Home = () => {
  const [page, setPage] = useState(0);
  const [todo, setTodo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTodo = async () => {
    try {
      const newTodo = await getTodo(10, page * 10); // Fetch data
      console.log('Fetched new todos: ', newTodo); // Check the response structure
      setTodo(prevTodo => [...prevTodo, ...newTodo]); // Append to existing list
    } catch (error) {
      console.log('Error fetching todo is - ', error);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [page]);

  useEffect(() => {
    console.log('Updated todo data:', todo);
  }, [todo]); // Logs whenever todo updates

  const filteredTodos = todo.filter(todo =>
    todo.todo.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.mainContainer}>
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
});
