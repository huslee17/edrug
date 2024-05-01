import axios from "axios";

const instance = axios.create({
  baseURL: "http://26.197.229.12:8000",
  // baseURL:
  // radmin 26.197.229.12:8000
  timeout: 1000,
});

export const login = async ({ phone, password }) => {
  return instance.post("/login", {
    email: phone,
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

export async function userdrug() {
  const response = instance.get(`/drugid/${1}`);
  return response;
}
export async function druglist() {
  const response = instance.get("/druglist");
  return response;
}
// export async function DrugListData() {
//   const response = instance.post();
//   return response;
// }
// export async function DrugListData() {
//   const response = instance.delete();
//   return response;
// }
// export async function DrugListData() {
//   const response = instance.put();
//   return response;
// }
