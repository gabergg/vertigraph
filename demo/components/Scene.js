import React, { Component } from 'react'
import shouldPureComponentUpdate from '../../src/utils/shouldPureComponentUpdate'
const getStyles = (width, height ) => {
  return {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: 'black',
  }
}

export default class Scene extends Component {
    shouldComponentUpdate = shouldPureComponentUpdate
    render () {
    const { width, height, isDragging, isDragPreview } = this.props
    return (
      <div style={getStyles(width, height )}/>
    )
  }
}
