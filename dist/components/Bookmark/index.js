import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React from "react";
import icon from "../icon";
import "./bookmark.css";

var Bookmark =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Bookmark, _React$Component);

  function Bookmark() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Bookmark);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Bookmark)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      showBookmarkResults: false
    };

    _this.toggleBookmarkResults = function () {
      _this.setState({
        showBookmarkResults: !_this.state.showBookmarkResults
      }, function () {
        // Hide the search result box since bookmarks box is shown
        _this.state.showBookmarkResults && _this.props.hideSearchResults();
      });
    };

    _this.bookmarkList = function () {
      if (Object.keys(_this.props.bookmarks).length > 0) {
        return React.createElement("div", {
          className: "item-wrapper bookmark-results"
        }, Object.keys(_this.props.bookmarks).map(function (path) {
          var node = _this.props.bookmarks[path];
          return React.createElement("div", {
            key: path,
            className: "indent mb bookmark-item"
          }, React.createElement("span", {
            onClick: function onClick() {
              return _this.props.handleRemoveBookmark(node);
            },
            title: "Remove Bookmark",
            className: "remove-bookmark"
          }, icon.close()), React.createElement("div", {
            onClick: function onClick() {
              _this.props.handleBookmarkClick(node);

              _this.toggleBookmarkResults();
            }
          }, icon.file(node), " ", React.createElement("span", null, node.name)), React.createElement("div", {
            className: "bookmark-path"
          }, path));
        }));
      }

      return React.createElement("div", {
        className: "item-wrapper bookmark-results empty-results"
      }, React.createElement("span", {
        className: "tomato"
      }, icon.close()), " No Bookmarks Added");
    };

    return _this;
  }

  _createClass(Bookmark, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "bookmark-wrapper"
      }, React.createElement("div", {
        onClick: this.toggleBookmarkResults,
        className: "bookmark-icon",
        title: "Show Bookmarks"
      }, icon.star()), React.createElement("div", {
        style: {
          display: this.state.showBookmarkResults && !this.props.showSearchBox ? "block" : "none"
        }
      }, React.createElement("p", {
        className: "title"
      }, "Bookmarks ", React.createElement("small", {
        onClick: this.toggleBookmarkResults
      }, "Close")), this.bookmarkList()));
    }
  }]);

  return Bookmark;
}(React.Component);

export default Bookmark;