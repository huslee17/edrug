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

// Em list
export async function druglist() {
  const response = instance.get("/druglist");
  return response;
}

// Detail
export async function Getdrugid(id) {
  try {
    const response = await instance.get(`/drugid/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error getting drug details:", error);
    return null;
  }
}

export async function Categorylist() {
  const response = instance.get("/category");
  return response;
}
export async function newsdatalist() {
  const response = instance.get("/post");
  return response;
}
// export async function DrugListData() {
//   const response = instance.delete();
//   return response;
// }
// export async function DrugListData() {
//   const response = instance.put();
//   return response;
// }
export async function Searcname(searchQuery) {
  const response = await instance.post("/searchDrugs", {
    drugname: searchQuery.toLowerCase(),
  });
  return response.data;
}
