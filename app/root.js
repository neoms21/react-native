'use strict'
import PropTypes from 'prop-types'
import React, {
    Component,
    StatusBarIOS,
    Platform
} from 'react-native'


import App from './containers/App'

// const createStoreWithMW = applyMiddleware(logger, thunk)(createStore)
// const store = createStoreWithMW(reducers)

export default class Root extends Component {

    componentDidMount () {
        if (Platform.OS === 'ios') {
            StatusBarIOS.setHidden(true)
        }
    }

    render () {
        return (
            <App />
        )
    }
}