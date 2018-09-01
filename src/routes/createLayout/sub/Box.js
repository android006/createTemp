import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import styles from './filt.less';

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
    }
  },
};

class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired,
  };

  render() {
    const { name, isDropped, connectDragSource,img } = this.props;
    return connectDragSource(
      <div className={styles.draItem}>
        <img src={img} style={{width:'100%',marginBottom:4}}/>
        {isDropped ? <s>{name}</s> : name}
        <div className={styles.mask}/>
      </div>
    )
  }
}

export default DragSource(props => props.type, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Box);
