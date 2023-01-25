import axios from 'axios';
//import { clearStore } from '../features/user/userSlice';
//import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

export default customFetch