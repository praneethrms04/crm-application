import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

/*
SIGNUP: 
POST : api 
url : /crm/api/v1/auth/signup
data : userid, email, name, pw
 */

// console.log(BASE_URL);
export async function userSignup(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data); 
}

/*
SIGNIN: 
POST : api 
url : /crm/api/v1/auth/signin
data : userid, pw
 */

export async function userSignin(data) {
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data); 
}


