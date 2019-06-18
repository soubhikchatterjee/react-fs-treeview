import axios from "axios";
import base64 from "base-64";

const BASE_URL = "http://localhost:5000";

const tree = async dirPath => {
  const response = await axios.get(
    `${BASE_URL}/?path=${base64.encode(dirPath)}`
  );
  return response.data;
};

const search = async (dirPath, query) => {
  const response = await axios.get(
    `${BASE_URL}/search?query=${base64.encode(query)}&path=${base64.encode(
      dirPath
    )}`
  );
  return response.data;
};

const renameNode = async ({ oldPath, newFileName }) => {
  const response = await axios.put(`${BASE_URL}/rename`, {
    oldPath,
    newFileName
  });
  return response;
};

const deleteNode = async fullPath => {
  const response = await axios.delete(`${BASE_URL}`, {
    params: { fullPath }
  });
  return response.status;
};

export default {
  tree,
  search,
  renameNode,
  deleteNode
};
