import axios from "axios"
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

let api = '';

console.log(import.meta.env.MODE)
console.log(import.meta.env.DEV)
console.log(import.meta.env.PROD)

if(import.meta.env.PROD) {
  api = "https://100.20.92.101:8080/api/"
} else {
  api = "http://localhost:5094/api/"
}

export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    })
    return data;
  } catch (error) {
    handleError(error)
  }
}

export const registerAPI = async (email: string, username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/register", {
      username: username,
      password: password,
      email: email,
    })
    return data;
  } catch (error) {
    handleError(error)
  }
}