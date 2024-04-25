import axios from "axios";

const instance = axios.create({
  baseURL: "http://26.197.229.12:8000",
  // baseURL:
  // radmin 26.197.229.12:8000
  timeout: 1000,
});

export const login = async ({ phone, password }) => {
  return instance.post("/login", {
    phonenumber: phone,
    password: password,
  });
};

export const register = async ({
  firstname,
  lastname,
  username,
  email,
  phonenumber,
  password,
  usertypeid,
}) => {
  return instance.post("/register", {
    firstname: firstname,
    lastname: lastname,
    username: username,
    email: email,
    phonenumber: phonenumber,
    password: password,
    usertypeid: usertypeid,
  });
};

export async function DrugListData() {
  const response = instance.get();
  return response;
}
