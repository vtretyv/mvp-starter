import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    There are { props.items.length } videos in your favorites. Here are the titles:
    <br/><br/>
    {props.items.map((item,iter) => <ListItem item={item} key={iter}/>)}
  </div>
)

export default List;