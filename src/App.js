import React from "react";
import "./css/App.css";
import Header from "./components/Header";
import Select from "./components/Select";
import Navs from "./components/Navs";
import NewsTiles from "./components/NewsTiles";

class App extends React.Component {
  state = {
    selectedOption: "top-headlines",
    url: `https://newsapi.org/v2/top-headlines?apiKey=9e2b01bc5eab40e0bd6299b70e3082cf&country=in&pageSize=20&page=1`
  };

  setSelections = event => {
    let url = "";
    const thButton = document.getElementById("thButton");
    const eButton = document.getElementById("eButton");
    if (event.target.value === "top-headlines") {
      thButton.style.borderBottom = "solid 5px #666";
      eButton.style.borderBottom = "none";
      url = `https://newsapi.org/v2/top-headlines?apiKey=9e2b01bc5eab40e0bd6299b70e3082cf&country=in&pageSize=20&page=1`;
    } else if (event.target.value === "everything") {
      eButton.style.borderBottom = "solid 5px #666";
      thButton.style.borderBottom = "none";
      url = `https://newsapi.org/v2/everything?apiKey=9e2b01bc5eab40e0bd6299b70e3082cf&sources=the-times-of-india&pageSize=20&page=1`;
    }
    this.setState({
      selectedOption: event.target.value,
      url: url
    });
  };

  setUrl = event => {
    event.preventDefault();
    let urlTemp = "https://newsapi.org/v2/" + this.state.selectedOption + "?";
    urlTemp += "apikey=9e2b01bc5eab40e0bd6299b70e3082cf";
    if (this.state.selectedOption === "top-headlines") {
      console.log(event.target.elements["category"].value);
      if (event.target.elements["category"].value !== "all") {
        urlTemp += "&category=" + event.target.elements["category"].value;
      }
      urlTemp += "&country=in&pageSize=20&page=1";
      console.log(urlTemp);
    } else if (this.state.selectedOption === "everything") {
      if (event.target.elements["qInput"].value !== "") {
        urlTemp += "&q=" + event.target.elements["qInput"].value;
      }
      urlTemp += "&sources=" + event.target.elements["source"].value;
      urlTemp += "&sortBy=" + event.target.elements["sortby"].value;
      urlTemp += "&pageSize=20&page=1";
      console.log(urlTemp);
    }
    this.setState({
      selectedOption: this.state.selectedOption,
      url: urlTemp
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Navs onClick={this.setSelections} />
        <Select
          selectedOption={this.state.selectedOption}
          onSubmit={this.setUrl}
        />
        <NewsTiles url={this.state.url} />
      </div>
    );
  }
}

export default App;
