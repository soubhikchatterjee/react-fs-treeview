import React from "react";
import icon from "./fontawesome";
import request from "../services/request";
import PropTypes from "prop-types";

class Search extends React.Component {
  state = {
    query: "",
    result: [],
    showSearchBox: false
  };

  handleSearch = async event => {
    const dirPath = this.props.basePath;
    const query = event.target.value;
    const result = await request.search(dirPath, query);

    if (!query) {
      this.setState({
        query: "",
        result: [],
        showSearchBox: false
      });
      return;
    }

    this.setState({
      query,
      result,
      showSearchBox: true
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

  results = () => {
    if (this.state.result.length > 0) {
      return this.showResults();
    }

    return this.emptyResults();
  };

  render() {
    return (
      <div className="search-wrapper">
        <span className="searchIcon">{icon.search()}</span>
        <input
          type="text"
          className="fa search"
          placeholder="Search"
          onChange={this.handleSearch}
          onKeyDown={this.clearSearch}
          value={this.state.query}
        />

        <div style={{ display: this.state.showSearchBox ? "block" : "none" }}>
          {this.results()}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  basePath: PropTypes.string.isRequired
};

export default Search;
