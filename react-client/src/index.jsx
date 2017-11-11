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
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      method: 'GET', 
      // contentType: 'application/json',
      success: (data) => {
        console.log('Data line 22:', data);
        // console.log('type of data', typeof data)
        // console.log('json parsed data', JSON.parse(data));
        this.setState({
          items: JSON.parse(data)
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  
  //Need to pass search down so that it can have access to this state
  search (query) {
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
    })
  }

  render () {
    return (
      <div style = {divStyle}>
        <h1>Vidify</h1>
        <List items={this.state.items}/>
        <Searches onSearch={this.search} onSearch={this.search}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));