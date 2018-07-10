import React, {Component} from "react";
import API from "../utils/API";

class Home extends Component {

  state = {
    articles: [],
    q: "",
    begin_date: "",
    end_date: ""
  }

  handleOnChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  articleSearch = event => {
    event.preventDefault();
    API.nytSearch({
      q: this.state.q
    }).then(res => {
      console.log(res.data);
      this.setState({
        articles: res.data.response.docs,
        q: ""
      })
    })
    .catch(err => console.log(err))
  }

  saveArticle = id => {
    const savedArticle = this.state.articles.find(article => (article._id === id));

    console.log(savedArticle);
    API.articleSave({
      title: savedArticle.headline.main,
      url: savedArticle.web_url,
      date: savedArticle.pub_date || ""
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid py-3 home-jumbo">
          <div className="row align-items-center justify-content-center my-5 text-center">
            <h1>Search The New York Times<br/>...With React!</h1>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row justify-content-center text-center">

            {/* Form for article search */}
            <div className="col-12 col-md-6">
              <h2>Search For Articles</h2>
              <form>
                <div className="form-group">
                  <input
                    name="q"
                    value={this.state.q}
                    placeholder="Enter Search Term"
                    type="text"
                    onChange={this.handleOnChange}
                    className="form-control mb-2"/>
                  <button type="submit" className="btn btn-block" onClick={this.articleSearch}>
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Article result container */}
            <div className="col-10">
              <h3>{this.state.articles.length
                  ? "Article Results"
                  : "No Search Results"}
              </h3>

              <ul className="list-group list-group-flush">
                {this
                  .state
                  .articles
                  .map(article => (
                    <li key={article._id} className="list-group-item d-flex justify-content-between align-items-center">
                      {article.headline.main}
                      <span
                        className="badge badge-primary badge-pill"
                        onClick={() => this.saveArticle(article._id)}>Save Article</span>
                    </li>
                  ))}
              </ul>
            </div>

          </div>
        </div>

        <footer className="row text-center mt-5 py-3">
              <p className="col-12">© Copyright 2018 Tony Wible</p>    
        </footer>

      </div>
    )
  }
}

export default Home;