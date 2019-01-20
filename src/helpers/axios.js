import axios from 'axios';
import store from '../store';
import authActions from '../store/actions/auth.actions';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '121486b23802e0b6735125ff1892f340',
  },
});

instance.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    store.dispatch(authActions.sessionTimeout());
  }
  return Promise.reject(error);
});

export default instance;
