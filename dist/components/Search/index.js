import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React from "react";
import icon from "../icon";
import request from "../../services/request";
import Bookmark from "../Bookmark";
import "./search.css";
import spinner from "../../images/spinner.gif";

var Search =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Search);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Search)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      query: "",
      result: [],
      showSearchLoader: false,
      showSearchBox: false
    };
    _this.runDebounce = _this.debounce(_this.doSearch, 1000);

    _this.handleChange = function (query) {
      if (!query) {
        _this.setState({
          query: ""
        });

        return;
      }

      _this.setState({
        query: query,
        showSearchBox: true,
        showSearchLoader: true
      });
    };

    _this.clearSearch = function (event) {
      var keyCode = event.which || event.keyCode;

      if (keyCode === 27) {
        // Clear search
        _this.setState({
          query: "",
          result: [],
          showSearchBox: false
        });
      }
    };

    _this.showResults = function () {
      return React.createElement("div", {
        className: "item-wrapper search-results"
      }, _this.state.result.map(function (item) {
        return React.createElement("div", {
          key: item.path,
          className: "indent mb search-item"
        }, React.createElement("div", null, icon.file(item), " ", React.createElement("span", null, item.name)), React.createElement("div", {
          className: "search-path"
        }, item.path));
      }));
    };

    _this.emptyResults = function () {
      return React.createElement("div", {
        className: "item-wrapper search-results empty-results"
      }, React.createElement("span", {
        className: "tomato"
      }, icon.close()), " No Matching Records");
    };

    _this.loadingResults = function () {
      return React.createElement("div", {
        className: "item-wrapper search-results empty-results"
      }, React.createElement("img", {
        src: spinner,
        width: "50",
        height: "50",
        alt: "Loading Search Results"
      }));
    };

    _this.results = function () {
      if (_this.state.showSearchLoader) {
        return _this.loadingResults();
      }

      if (_this.state.result.length > 0) {
        return _this.showResults();
      }

      return _this.emptyResults();
    };

    return _this;
  }

  _createClass(Search, [{
    key: "debounce",
    value: function debounce(fn, delay) {
      var timer;
      return function () {
        var _this2 = this,
            _arguments = arguments;

        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(_this2, _arguments);
        }, delay);
      };
    }
  }, {
    key: "doSearch",
    value: function () {
      var _doSearch = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(query) {
        var dirPath, result;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (query) {
                  _context.next = 3;
                  break;
                }

                this.setState({
                  query: "",
                  result: [],
                  showSearchBox: false,
                  showSearchLoader: false
                });
                return _context.abrupt("return");

              case 3:
                dirPath = this.props.basePath;
                _context.next = 6;
                return request.search(dirPath, query);

              case 6:
                result = _context.sent;
                this.setState({
                  query: query,
                  result: result,
                  showSearchBox: true,
                  showSearchLoader: false
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function doSearch(_x) {
        return _doSearch.apply(this, arguments);
      }

      return doSearch;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement("div", {
        className: "search-wrapper"
      }, React.createElement("span", {
        className: "search-icon"
      }, icon.search()), React.createElement("input", {
        type: "text",
        className: "fa search",
        placeholder: "Search",
        onChange: function onChange(event) {
          _this3.handleChange(event.target.value);

          _this3.runDebounce(event.target.value);
        },
        onKeyDown: this.clearSearch,
        value: this.state.query
      }), React.createElement(Bookmark, {
        bookmarks: this.props.bookmarks,
        handleBookmarkClick: this.props.handleBookmarkClick,
        handleRemoveBookmark: this.props.handleRemoveBookmark
      }), React.createElement("div", {
        style: {
          display: this.state.showSearchBox ? "block" : "none"
        }
      }, this.results()));
    }
  }]);

  return Search;
}(React.Component);

export default Search;