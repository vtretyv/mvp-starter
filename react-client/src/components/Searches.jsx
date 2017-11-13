import React from 'react';
import ListItem from './ListItem.jsx';

class Searches extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ingredientQuery: '',
      dishQuery: ''
    }
    this.changeQuery = this.changeQuery.bind(this);
    this.changeChannel = this.changeChannel.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    this.searchChannel = this.searchChannel.bind(this);
  }
  
  changeQuery(event) {
    this.setState(
      {ingredientQuery: event.target.value} //Goes to input or form where event was fired and checks what the value parameter was 
    );
    // console.log(this.state.ingredientQuery);
  }
  
  changeChannel(event) {
    this.setState(
      {dishQuery: event.target.value} //Goes to input or form where event was fired and checks what the value parameter was 
    );
    // console.log(this.state.dishQuery);
  }
  
  searchQuery() {
    this.props.onSearch(this.state.ingredientQuery);
  }
  
  searchChannel() {
    this.props.onSearch(this.state.dishQuery);
  }
  
  render(){
  return (

    <div>
      <br/>
      Type in a search to add to your favorites, or "!clear" to clear your favorites. Default videos are the most Popular.
      <br/>
      <br/>
          Query Search: <input type='text' value={this.state.ingredientQuery} onChange={this.changeQuery}/>
      <button onClick = {this.searchQuery}> Add by Query </button>
          
    </div>
    )
  }
}

{/* <br/>
    Channel Search: <input type='text' value={this.state.dishQuery} onChange={this.changeChannel}/>
  <button onClick = {this.searchChannel}> Add by Channel </button> */}

export default Searches;   