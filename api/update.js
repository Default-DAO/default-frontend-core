import axios from 'axios'
let http = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*'
  }
});

export const updateMember = async (params) => {
  
}