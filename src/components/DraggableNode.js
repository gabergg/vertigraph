import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from '../utils/shouldPureComponentUpdate';
import ItemTypes from '../constants/ItemTypes';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const nodeSource = {
  beginDrag(props) {
    const {id, x, y, width, height} = props
    return {id, x, y, width, height}
  }
};

function getStyles(props) {
  const { x, y, isDragging } = props;
  const transform = `translate3d(${x}px, ${y}px, 0)`

  return {
    position: 'absolute',
    transform: transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,    
  };
}


class DraggableNode extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render() {
    const { connectDragSource, renderNode, item, isDragging } = this.props;
    const styles = getStyles(this.props)
    return connectDragSource(
      <div style={styles}>
        {renderNode(item)}
      </div>
    );
  }
}

export default DragSource('draggable', nodeSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))(DraggableNode)
