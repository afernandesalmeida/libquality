import axios from 'axios';
import 'dotenv';


const api = axios.create({
  baseURL: `https://${process.env.API_CREDENTIALS}@api.github.com/`,
});
export default api;
