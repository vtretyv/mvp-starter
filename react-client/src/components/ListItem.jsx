import React from 'react';

const ListItem = (props) => (
  <div>
    <img src={props.item.thumbnail} style={{'vertical-align':'middle','margin-right':'20px'}}/>
    {props.item.title}
    <a href={props.item.fullVideoUrl} style = {{'margin-left':'20px'}}>Link to Video </a>
    <br/><br/>
  </div>
)

export default ListItem;