/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Vertigraph from '../src'
import Scene from './components/Scene'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: {
        'uniqueId': {id: 'uniqueId', y: 0, x: 0, width: 375, height: 667},
      }
    }
  }

  render() {
    return (
      <Vertigraph
        containerStyle={{width: 2000, height: 2000}}
        data={this.state}
        onChange={(data) => {
          this.setState({
            ...data,
          })
        }}
        renderNode={(nodeData) => {
          return <Scene {...nodeData} />
        }}
      />
    )
  }

}

export default connect()(Demo)
