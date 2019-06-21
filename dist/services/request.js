import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import axios from "axios";
import base64 from "base-64";
import PropTypes from "prop-types";
var BASE_URL = "http://localhost:5000";

var tree =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(dirPath) {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.get("".concat(BASE_URL, "/?path=").concat(base64.encode(dirPath)));

          case 2:
            response = _context.sent;
            return _context.abrupt("return", response.data);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function tree(_x) {
    return _ref.apply(this, arguments);
  };
}();

var search =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(dirPath, query) {
    var response;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.get("".concat(BASE_URL, "/search?query=").concat(base64.encode(query), "&path=").concat(base64.encode(dirPath)));

          case 2:
            response = _context2.sent;
            return _context2.abrupt("return", response.data);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function search(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var dragDrop =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(_ref3) {
    var source, destination, overwrite, response;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            source = _ref3.source, destination = _ref3.destination, overwrite = _ref3.overwrite;
            _context3.next = 3;
            return axios.post("".concat(BASE_URL, "/dragdrop"), {
              source: source,
              destination: destination,
              overwrite: overwrite
            });

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function dragDrop(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var renameNode =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee4(_ref5) {
    var oldPath, newFileName, response;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            oldPath = _ref5.oldPath, newFileName = _ref5.newFileName;
            _context4.next = 3;
            return axios.put("".concat(BASE_URL, "/rename"), {
              oldPath: oldPath,
              newFileName: newFileName
            });

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function renameNode(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

var deleteNode =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5(fullPath) {
    var response;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return axios.delete("".concat(BASE_URL), {
              params: {
                fullPath: fullPath
              }
            });

          case 2:
            response = _context5.sent;
            return _context5.abrupt("return", response.status);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteNode(_x6) {
    return _ref7.apply(this, arguments);
  };
}();

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
  tree: tree,
  search: search,
  dragDrop: dragDrop,
  renameNode: renameNode,
  deleteNode: deleteNode
};