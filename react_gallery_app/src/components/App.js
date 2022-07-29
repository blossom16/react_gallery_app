/*
React Image Gallery
 */

//Import React library
import React, { Component } from "react";
import "../index.css";
import { BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

//App components
import Nav from "./Nav";
import apiKey from "../config";
import Search from "./Search";
import PhotoContainer from "./PhotoContainer";
import PageNotFound from "./NotFound";

class App extends Component {

  constructor() {
  super();
      this.state = {
        //loading: true,
        photos: [],
        otters: [],
        pelicans: [],
        whales: [],
        query: ""
      };
}

//lifecycle method that is called at key times in a component's life cycle
componentDidMount() {
  this.performSearch('otters');
  this.performSearch('pelicans');
  this.performSearch('whales');

}

//function to search photos
performSearch = (query = 'otters') => {this.setState({loading: true});
fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&max_upload_date=07%2F01%2F2022&
    &per_page=16&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then((data) => {
      if (query === 'otters') {
        this.setState({otters: data.photos.photo, loading: false});
      } else if (query === 'pelicans') {
        this.setState({pelicans: data.photos.photo, loading: false});
      } else if (query === 'whales') {
        this.setState({whales: data.photos.photo, loading: false});
      } else {
        this.setState({
          photos: data.photos.photo,
          loading: false,
          query: query
        });
      }
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
    };


//Route setup so we can switch from different paths
  render () {
    return (
      <BrowserRouter>
        <div className="container">
        <Search onSearch={this.performSearch} />
        <Nav />
          {
              (this.state.loading)
                ? <p>Loading...</p>
                : <Switch>
                    <Route exact path="/" component={ () => <Redirect to="/Otters" /> } />
                    <Route path="/Otters" component={() => <PhotoContainer query="Otters" title="Otters" data={this.state.otters} />} />
                    <Route path="/Pelicans" component={() => <PhotoContainer query="Pelicans" title="Pelicans" data={this.state.pelicans} />} />
                    <Route path="/Whales" component={() => <PhotoContainer query="Whales" title="Whales" data={this.state.whales} />} />
                    <Route path="/search/:query/" component={() => <PhotoContainer query={this.state.query} data={this.state.photos} title= {this.state.query}/>} />
                    <Route component={PageNotFound} />

                  </Switch>
          }
        </div>
      </BrowserRouter>
    )
  }
}

export default App;