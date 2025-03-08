import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const saveUser = (key, value) => {
  storage.set(key, JSON.stringify(value));
  console.log('User Details from Storage ------', value);
};

export const getUser = key => {
  const value = storage.getString(key);
  return value ? JSON.parse(value) : null;
};