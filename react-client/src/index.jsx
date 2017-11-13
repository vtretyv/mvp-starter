import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Searches from './components/Searches.jsx';

const divStyle = {
  textAlign: 'center',
  font: "times-new-roman"
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      playerHeight: 0,
      playerWidth: 0,
      randomVid:[{}],
      playerDetail: 'none'
      //embedUrl: 'https://www.youtube.com/embed/'+window.context.state.randomVid[0].videoId,
    }
    window.context = this;
    this.pToggle = this.pToggle.bind(this);
    this.random = this.random.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    // console.log('context in did mount', context)
    // console.log(this.state.randomVid)
    document.body.style.backgroundColor = '#98FB98';
    $.ajax({
      url: '/items',
      method: 'GET', 
      // contentType: 'application/json',
      success: (data) => {
        console.log('Data line 22:', data);
        // console.log('type of data', typeof data)
        // console.log('json parsed data', JSON.parse(data));
        this.setState({
          items: data
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  //Need to pass search down so that it can have access to this state
  search (query) {
    if (query === '!clear'){
      let vidTitle = document.getElementsByClassName('pDetails');
      this.setState({playerHeight:0});
      this.setState({playerWidth:0});
      Array.from(vidTitle).forEach((detail)=>{
        detail.style.display ='none';
      })
      this.setState({randomVid:[{}]})
    }
    $.ajax({
      type:'POST',
      url: '/items',
      data: JSON.stringify({'query':query}),
      contentType: 'application/json',
      success: ()=> {
        console.log('POST SUCCESS');
      },
      error: ()=>{
        console.log('POST FAILED');
      }
    }).then(()=>{
      $.ajax({
        type:'GET',
        url: '/items',
        contentType: 'application/json',
        success: (data)=> {
          // console.log('GET SUCCESS', data, typeof data);
          this.setState({
            items: data
          });
        },
        error: ()=>{
          console.log('GET FAILED');
        }
      });
    })
  }

  pToggle() {
    let vidTitle = document.getElementsByClassName('pDetails');
    console.log('vidTitle', vidTitle);
    if(this.state.playerHeight !== 0) {
      this.setState({playerHeight:0});
      this.setState({playerWidth:0});
      Array.from(vidTitle).forEach((detail)=>{
        detail.style.display ='none';
      })
    } else {
      console.log('in the else');
      this.setState({playerHeight:360});
      this.setState({playerWidth:640});
      Array.from(vidTitle).forEach((detail)=>{
        detail.style.display ='block';
      })
    }
  }
  random () {
    // console.log('random this',this);
    // if (this.state.randomVid !== [] || this.state.randomVid !== [{}]) {
    // let vidTitle = document.getElementsByClassName('pDetails');    
    // this.setState({playerHeight:360});
    // this.setState({playerWidth:640});
    // Array.from(vidTitle).forEach((detail)=>{
    //   detail.style.display ='block';
    // })
    $.ajax({
      type:'GET',
      url: '/random',
      contentType: 'application/json',
      success: (data)=> {
        console.log('GET SUCCESS', data, typeof data);
        window.context.setState({
          randomVid: data
        });
      },
      error: ()=>{
        console.log('GET FAILED');
      }
    });
  }

  render () {
    return (
      <div style = {divStyle}>
        <h1>Youtube Randomizer</h1>
        <List items={this.state.items}/>
        <Searches onSearch={this.search} onSearch={this.search}/>
        <br/>
        <button type ='button' onClick ={this.random}> Get a random Video </button>

        <button type='button' onClick = {this.pToggle}> Toggle Player </button>
        <br/>
        <br/>
        <div className='pDetails' style={{display:'none'}}> Video Title: {this.state.randomVid[0].title}</div>
        <iframe height={this.state.playerHeight} width={this.state.playerWidth} className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.state.randomVid[0].videoUrl}`} allowFullScreen></iframe>
        <div className='pDetails' style = {{display:'none'}}>Video Description: {this.state.randomVid[0].description}</div>
      </div>
    )
  }
}

//<iframe height="360" width="640" className="embed-responsive-item" src={this.state.embedUrl} allowFullScreen></iframe>


ReactDOM.render(<App />, document.getElementById('app'));