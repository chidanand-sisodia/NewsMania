import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

  static defaultProps = {
    country: 'in',
    category: 'business',
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      isLastPage: false,
      loading: true,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMania`;
  }

  async componentDidMount() {
    this.fetchArticles();
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  handleScroll = (e) => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      if (!this.state.loading && !this.state.isLastPage) {
        this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchArticles);
      }
    }
  }

  fetchArticles = async () => {
    this.props.setProgress(20);
    this.setState({ loading: true });
    const pageSize = 6;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${pageSize}`;
    try {
      let response = await fetch(url);
      this.props.setProgress(50);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let parsedData = await response.json();
      this.props.setProgress(70);
      this.setState(prevState => ({
        articles: this.state.page === 1 ? parsedData.articles : [...prevState.articles, ...parsedData.articles],
        isLastPage: (parsedData.articles || []).length < pageSize,
        loading: false
      }));
      this.props.setProgress(100);
    } catch (error) {
      console.error("Fetch error: ", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, articles } = this.state;
    
    return (
      <div className='container my-5 pt-1'>
        <h1 className='my-5 text-center'>News Mania - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        
        {/* When initially loading, render spinner in the center */}
        {loading && articles.length === 0 && 
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Spinner />
          </div>
        }
        
        <div className="row">
          {articles.map((element, index) => (
            <div className="col-md-4 my-2" key={index}>
              <NewsItem 
                title={element.title ? element.title.slice(0, 45) : ""} 
                description={element.description ? element.description.slice(0, 88) : ""} 
                imageUrl={element.urlToImage} newsUrl={element.url} 
                author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          ))}
        </div>
        
        {/* When loading more articles on scroll, render spinner at the end */}
        {loading && articles.length > 0 && <Spinner />}
      </div>
    );
  }
}

export default News;











// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import PropTypes from 'prop-types';

// export class News extends Component {
   
//   static defaultProps={
//     country:'in',
//     category:'business'
//   }

//   static propTypes={
//     country:PropTypes.string,
//     category : PropTypes.string
//   }

//   capitalizeFirstLetter=(string)=>{
//     return string.charAt(0).toUpperCase()+string.slice(1);
//   }

//     constructor(props){
//       console.log("Hi I am constructor..!")
//         super(props);
//         this.state={
//             articles : [],
//             page: 1,  //initial page state
//             isLastPage: false,
//             loading:true,  
//         }
//         document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMania `;

//     }

//     async componentDidMount(){
//      this.fetchArticles();
      
//     }

//     fetchArticles = async()=>{
//       // let pageSize=6
//       // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9c244da091746bc986aee0f175c9584&page=${this.state.page}&pageSize=${pageSize}`;
//       // let data= await fetch(url);
//       // let parsedData= await data.json()
//       // console.log(parsedData);
//       // this.setState({articles:parsedData.articles, 
//       //   isLastPage:parsedData.articles.length < pageSize,
//       // loading:false})

//       this.setState({ loading: true });
//       const pageSize = 6; // Define pageSize here
//       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2c6b91086be049d99fdf165070accbca&page=${this.state.page}&pageSize=${pageSize}`;
//       try {
//     let response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     let parsedData = await response.json(); // Define parsedData here
//     this.setState({
//       articles: parsedData.articles || [],
//       isLastPage: (parsedData.articles || []).length < pageSize, // Use pageSize here
//       loading: false
//     });
//   } catch (error) {
//     console.error("Fetch error: ", error);
//     this.setState({ loading: false });
//   }
//     }

//     handlePrevClick=()=>{
//       this.setState(prevState => ({ page: prevState.page - 1 }), this.fetchArticles);

//     }

//     handleNextClick=()=>{
//       this.setState(prevState => ({ page: prevState.page + 1 }), this.fetchArticles);
//     }

//   render() {
//     console.log("Render..!")
//     return (
      
//       <div className='container my-5 pt-1'>
//         <h1 className='my-5 text-center' >News Mania - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
//          {this.state.loading && <Spinner/>}
//          <div className="row">
//          {!this.state.loading &&  this.state.articles.map((element)=>{
//             return <div className="col-md-4 my-2" key={element.url}>
//                 <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} 
//                 imageUrl={element.urlToImage?element.urlToImage:"https://www.hindustantimes.com/ht-img/img/2024/04/02/1600x900/India_china_1712035213991_1712035226355.png"} 
//                 newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
//             </div>
            
//             })}
             
//         </div>
//         <div className="container d-flex justify-content-between">
//         <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
//         <button disabled={this.state.isLastPage} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>


//         </div>
  
        
//       </div>
//     )
//   }
// } 

// export default News



