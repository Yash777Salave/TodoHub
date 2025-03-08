import axios from 'axios';

const baseUrl = 'https://dummyjson.com/todos';


export const getTodo = async (limit = 10, skip = 0) => {
  try {
    const response = await axios.get(`${baseUrl}?limit=${limit}&skip=${skip}`);
    return response.data.todos || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    return []; 
  }
};

export const addTodo = async todo => {
  const response = await axios.post(`${baseUrl}+/add`, {
    todo,
    completed: false,
    userId: 1,
  });
  return response.data;
};

export const updateTodo = async (id, updateTodo) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateTodo);
  return response.data;
};

export const deleteTodo = async id => {
  return axios.delete(`${baseUrl}/${id}`);
};
