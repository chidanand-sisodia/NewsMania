import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  apiKey=process.env.REACT_APP_NEWS_API
 
  state={
      progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    console.log("API Key:", this.apiKey);
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
           
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" country="in" category="technology" />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

