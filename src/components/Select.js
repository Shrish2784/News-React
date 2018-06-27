import React from "react";
import "../css/select.css";

class Select extends React.Component {
  state = {
    sourcesInnerHtml: undefined,
    categoriesInnerHtml: undefined,
    sortbyinnerHtml: `
      <option value="publishedAt">Published At</option>
      <option value="popularity">Populatiy</option>
      <option value="relevancy">Relevancy</option>
    `
  };

  createoption = source => {
    return `
      <option value=${source["id"]}>${source["name"]}</option>
    `;
  };

  getCategoriesInnerHtml = () => {
    const categories = [
      "All",
      "Business",
      "Entertainment",
      "General",
      "Health",
      "Science",
      "Sports",
      "Technology"
    ];
    const categoriesInnerHtml = categories
      .map(elem => `<option value=${elem.toLowerCase()}>${elem}</option>`)
      .join("\n");
    return categoriesInnerHtml;
  };

  fetchData = () => {
    fetch(
      "http://newsapi.org/v2/sources?apikey=9e2b01bc5eab40e0bd6299b70e3082cf"
    )
      .then(response => response.json())
      .then(data => {
        console.log("request");
        this.setState({
          sourcesInnerHtml: data["sources"].map(this.createoption).join("\n"),
          categoriesInnerHtml: this.getCategoriesInnerHtml(),
          sortbyinnerHtml: this.state.sortbyinnerHtml
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    this.fetchData();
    // console.log("Select");
    return (
      <div id="select">
        <form onSubmit={this.props.onSubmit}>
          <input type="text" id="qInput" />
          {this.props.selectedOption === "top-headlines" && (
            <select
              dangerouslySetInnerHTML={{
                __html: this.state.categoriesInnerHtml
              }}
              id="category"
            />
          )}
          {this.props.selectedOption === "everything" && (
            <select
              dangerouslySetInnerHTML={{
                __html: this.state.sourcesInnerHtml
              }}
              id="source"
            />
          )}
          {this.props.selectedOption === "everything" && (
            <select
              dangerouslySetInnerHTML={{
                __html: this.state.sortbyinnerHtml
              }}
              id="sortby"
            />
          )}
          <button id="submitSelections">Get News</button>
        </form>
      </div>
    );
  }
}

export default Select;
