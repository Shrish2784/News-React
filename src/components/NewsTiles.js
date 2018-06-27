import React from "react";
import "../css/newstiles.css";

class NewsTiles extends React.Component {
  state = {
    response: undefined,
    articlesInnerHtml: undefined
  };

  // componentWillMount() {
  //   this.fetchData();
  // }

  fetchData = () => {
    fetch(this.props.url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          response: data,
          articlesInnerHtml: this.getInnerHtml(data)
        });
      })
      .catch(err => console.error(err));
  };

  transformToHtml = article => {
    const innerHtml = `<div id="tile">
      <h3 id="title" >${article["title"]}</h3>
      <a href="${article["url"]}">
        <img id="tileImage" src="${
          article["urlToImage"]
        }" alt="Image Not Found"/>
      </a>
      <div id="desc">${article["description"]}</div>
    </div>`;
    return innerHtml;
  };

  getInnerHtml = data => {
    const articles = data["articles"];
    const articlesInnerHtml = articles.map(this.transformToHtml).join("\n");
    return articlesInnerHtml;
  };

  render() {
    this.fetchData();
    // console.log("NewsTiles");
    return (
      <div
        id="floor"
        dangerouslySetInnerHTML={{
          __html: this.state.articlesInnerHtml
        }}
      />
    );
  }
}

export default NewsTiles;
