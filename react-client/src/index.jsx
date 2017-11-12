import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Searches from './components/Searches.jsx';

const divStyle = {
  textAlign: 'center'
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      showPlayer: false,
      randomVid:[{}],
    }
    window.context = this;
  }

  componentDidMount() {
    console.log('context in did mount', context)
    console.log(this.state.randomVid)
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
    var context = this;
    console.log('this', context);
    console.log('query', query);
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
          window.context.setState({
            items: data
          });
        },
        error: ()=>{
          console.log('GET FAILED');
        }
      });
    })
  }

  random () {
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
        <h1>Vidify</h1>
        <List items={this.state.items}/>
        <Searches onSearch={this.search} onSearch={this.search}/>
        <br/>
        <button type ='button' onClick ={this.random}> Get a random Video </button>

        <button type='button'> Render Player </button>
        <br/>
        <br/>
        <div> Random Video {this.state.randomVid[0].title}</div>
        <iframe height="360" width="640" className="embed-responsive-item" src={`https://www.youtube.com/embed/${this.state.randomVid[0].videoId}`} allowFullScreen></iframe>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));