import React, { Component, PropTypes } from 'react'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import CustomDragLayer from './CustomDragLayer'
import Container from './Container'
import update from 'react/lib/update';

class Vertigraph extends Component {
  static propTypes = {
    style: PropTypes.object,
    items: PropTypes.object,
  }
  static defaultProps = {
    containerStyle: {
      width: 500,
      height: 500,
    }
  }

  render() {
    const {onChange, renderNode, data, canvasDimensions} = this.props
    return (
      <div style={this.props.containerStyle}>
        <Container
          items={data.nodes}
          renderNode={this.props.renderNode}
          updateNode={(id, pos) => {
            onChange({
              ...this.props.data,
              nodes: {
                [id]: {
                  ...this.props.data.nodes[id],
                  ...pos,
                },
              }
            })
          }}
        />
        <CustomDragLayer renderNode={this.props.renderNode} />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Vertigraph)
