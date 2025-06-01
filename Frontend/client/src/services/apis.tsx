import axios from "axios";

const BASEURL = "https://aimodal-1.onrender.com";

const postData = (apiEndPoint: string, bodyData: Object) => {
  console.log(`${BASEURL}${apiEndPoint}`);
  return axios.post(`${BASEURL}${apiEndPoint}`, bodyData);
};

const getData = (apiEndPoint: string) => {
  return axios.get(`${BASEURL}${apiEndPoint}`);
};

const UpdateData = (apiEndPoint: string) => {
  return axios.put(`${BASEURL}${apiEndPoint}`);
};

const deleteData = (apiEndPoint: string) => {
  return axios.delete(`${BASEURL}${apiEndPoint}`);
};

export { postData, getData, UpdateData, deleteData };
