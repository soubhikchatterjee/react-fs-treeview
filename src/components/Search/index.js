import React from "react";
import icon from "../icon";
import request from "../../services/request";
import PropTypes from "prop-types";
import Bookmark from "../Bookmark";
import "./search.css";
import spinner from "../../images/spinner.gif";

class Search extends React.Component {
  state = {
    query: "",
    result: [],
    showSearchLoader: false,
    showSearchBox: false
  };

  runDebounce = this.debounce(this.doSearch, 1000);

  debounce(fn, delay) {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    };
  }

  async doSearch(query) {
    if (!query) {
      this.setState({
        query: "",
        result: [],
        showSearchBox: false,
        showSearchLoader: false
      });
      return;
    }

    const dirPath = this.props.basePath;
    const result = await request.search(dirPath, query);

    this.setState({
      query,
      result,
      showSearchBox: true,
      showSearchLoader: false
    });
  }

  handleChange = query => {
    if (!query) {
      this.setState({
        query: ""
      });
      return;
    }

    this.setState({
      query,
      showSearchBox: true,
      showSearchLoader: true
    });
  };

  clearSearch = event => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 27) {
      // Clear search
      this.setState({
        query: "",
        result: [],
        showSearchBox: false
      });
    }
  };

  showResults = () => {
    return (
      <div className="item-wrapper search-results">
        {this.state.result.map(item => (
          <div key={item.path} className="indent mb search-item">
            <div>
              {icon.file(item)} <span>{item.name}</span>
            </div>
            <div className="search-path">{item.path}</div>
          </div>
        ))}
      </div>
    );
  };

  emptyResults = () => {
    return (
      <div className="item-wrapper search-results empty-results">
        <span className="tomato">{icon.close()}</span> No Matching Records
      </div>
    );
  };

  loadingResults = () => {
    return (
      <div className="item-wrapper search-results empty-results">
        <img
          src={spinner}
          width="50"
          height="50"
          alt="Loading Search Results"
        />
      </div>
    );
  };

  results = () => {
    if (this.state.showSearchLoader) {
      return this.loadingResults();
    }

    if (this.state.result.length > 0) {
      return this.showResults();
    }

    return this.emptyResults();
  };

  render() {
    return (
      <div className="search-wrapper">
        <span className="search-icon">{icon.search()}</span>
        <input
          type="text"
          className="fa search"
          placeholder="Search"
          onChange={event => {
            this.handleChange(event.target.value);
            this.runDebounce(event.target.value);
          }}
          onKeyDown={this.clearSearch}
          value={this.state.query}
        />
        <Bookmark
          bookmarks={this.props.bookmarks}
          handleBookmarkClick={this.props.handleBookmarkClick}
          handleRemoveBookmark={this.props.handleRemoveBookmark}
        />

        <div style={{ display: this.state.showSearchBox ? "block" : "none" }}>
          {this.results()}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  basePath: PropTypes.string.isRequired,
  bookmarks: PropTypes.object.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  handleRemoveBookmark: PropTypes.func.isRequired
};

export default Search;
