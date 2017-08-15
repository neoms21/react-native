'use strict'

import React, {
    Component,
    View,
    Text,
    StyleSheet
} from 'react-native'
import {connect} from 'react-redux/native'
import {bindActionCreators} from 'redux'

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {
            tab: null
        }
    }

    componentWillReceiveProps (props) {
        const {application} = props
        this.setState({
            tab: application.tab
        })
    }

    render () {
        return (
            <View style={styles.container}>
                <Text>Lamp</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default connect(state => {
    return {
        application: state.application,
        game: {
            live: state.live,
            over: state.over,
            unstart: state.unstart,
            standing: state.standing,
            application: state.application
        },
        player: {
            playerList: state.playerList,
            playerLoaded: state.playerLoaded
        },
        team: {
            team: state.team,
            playerLoaded: state.playerLoaded
        }
    }
})(App)