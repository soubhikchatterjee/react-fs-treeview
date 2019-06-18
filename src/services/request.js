import axios from "axios";
import base64 from "base-64";
import PropTypes from "prop-types";

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

const dragDrop = async ({ source, destination, overwrite }) => {
  const response = await axios.post(`${BASE_URL}/dragdrop`, {
    source,
    destination,
    overwrite
  });
  return response;
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

tree.propTypes = {
  dirPath: PropTypes.string.isRequired
};

search.propTypes = {
  dirPath: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired
};

dragDrop.propTypes = {
  source: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  overwrite: PropTypes.bool.isRequired
};

renameNode.propTypes = {
  oldPath: PropTypes.string.isRequired,
  newFileName: PropTypes.string.isRequired
};

deleteNode.propTypes = {
  fullPath: PropTypes.string.isRequired
};

export default {
  tree,
  search,
  dragDrop,
  renameNode,
  deleteNode
};
