import React from "react";
import PropTypes from "prop-types";
import icon from "./fontawesome";

class Bookmark extends React.Component {
  state = {
    showBookmarkResults: false
  };

  toggleBookmarkResults = () => {
    this.setState({
      showBookmarkResults: !this.state.showBookmarkResults
    });
  };

  //   handleBookmarkClick = selectedBookmark => {
  //     console.log("handleBookmarkClick", selectedBookmark.path);
  //   };

  bookmarkList = () => {
    if (Object.keys(this.props.bookmarks).length > 0) {
      return (
        <div className="item-wrapper search-results">
          {Object.keys(this.props.bookmarks).map(path => (
            <div
              key={path}
              className="indent mb search-item"
              onClick={() => {
                this.props.handleBookmarkClick(this.props.bookmarks[path]);
                this.toggleBookmarkResults();
              }}
            >
              <div>
                {icon.file(this.props.bookmarks[path])}{" "}
                <span>{this.props.bookmarks[path].name}</span>
              </div>
              <div className="search-path">{path}</div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="item-wrapper search-results empty-results">
        <span className="tomato">{icon.close()}</span> No Bookmarks Added
      </div>
    );
  };

  render() {
    return (
      <div className="bookmark-wrapper">
        <div
          onClick={this.toggleBookmarkResults}
          className="bookmark-icon"
          title="Show Bookmarks"
        >
          {icon.star()}
        </div>

        <div
          style={{ display: this.state.showBookmarkResults ? "block" : "none" }}
        >
          <p className="title">Bookmarks</p>
          {this.bookmarkList()}
        </div>
      </div>
    );
  }
}

Bookmark.propTypes = {
  bookmarks: PropTypes.object.isRequired
};

export default Bookmark;
