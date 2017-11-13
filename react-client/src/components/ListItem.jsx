import React from 'react';

const ListItem = (props) => (
  <div>
    {props.item.title}
    <a href={props.item.fullVideoUrl}> Link to Video </a>
    <br/><br/>
  </div>
)

export default ListItem;