import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from '../utils/shouldPureComponentUpdate';
import update from 'react/lib/update';
import ItemTypes from '../constants/ItemTypes';
import DraggableNode from './DraggableNode';
import { DropTarget } from 'react-dnd';

const styles = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const nodeTarget = {
  drop(props, monitor, component) {
    const delta = monitor.getDifferenceFromInitialOffset();
    const item = monitor.getItem();

    let x = Math.round(item.x + delta.x);
    let y = Math.round(item.y + delta.y);

    props.updateNode(item.id, {
      x,
      y,
    })
  }
};

class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    items: PropTypes.object
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  renderDraggableNode(item, key) {
    const { renderNode } = this.props
    return (
      <DraggableNode
        key={key}
        id={key}
        renderNode={renderNode}
        item={item}
        {...item}
      />
    );
  }

  render() {
    const { connectDropTarget, items } = this.props;

    return connectDropTarget(
      <div style={styles}>
        {Object
          .keys(items)
          .map(key => this.renderDraggableNode(items[key], key))
        }
      </div>
    );
  }
}

export default DropTarget('draggable', nodeTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Container)
