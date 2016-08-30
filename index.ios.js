import React, { Component } from 'react'
import {
  AppRegistry,
  ListView,
  StyleSheet,
  View,
} from 'react-native'

import Headerbar from './components/headerbar'
import InactiveListItem from './components/inactive-list-item.js'
import ActiveListItem from './components/active-list-item.js'
import * as firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCTOUQrFxR3icY0tyXCsXONRfWTop8KqzY",
  authDomain: "utopia-53608.firebaseapp.com",
  databaseURL: "https://utopia-53608.firebaseio.com",
  storageBucket: "utopia-53608.appspot.com",
})

class utopiaApp extends Component {
  constructor(props) {
    super(props)
    this.itemsSortedRef = firebaseApp.database().ref('issues/').orderByChild('lastUpdated')
    this.itemsRef = firebaseApp.database().ref('issues/')
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true})
    this.state = {
      selectedIndex: '0',
    }
    this.state.dataSource = ds.cloneWithRows([])
  }

  listenForItems(itemsSortedRef) {
    itemsSortedRef.on('value', (snap) => {

      // get children as an array
      var items = []
      snap.forEach(child => {
        items.push({
          title: child.val().title,
          people: child.val().people || [],
          description: child.val().description || '',
          lastUpdated: child.val().lastUpdated || new Date(0),
          _key: child.key
        })
      })

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items.reverse())
      })

    })
  }

  componentDidMount() {
    this.listenForItems(this.itemsSortedRef)
  }

  pressComposeButton() {
    // create new blank item and select it
    this.itemsRef.push({title: '', description: '', people: [], lastUpdated: new Date()})

    this.setState({
      selectedIndex: '0',
    })
  }

  updateData(childKey, update) {
    this.itemsRef.child(childKey).update({...update, lastUpdated: new Date()})
    this.setState({
      selectedIndex: '0',
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Headerbar pressComposeButton={() => this.pressComposeButton()} />
        <ListView style={styles.list}
          dataSource={this.state.dataSource}
          enableEmptySections
          renderRow={(rowData, sectionId, rowId) => (
            // Render an active or inactive list item
            this.state.selectedIndex === rowId
              ? <ActiveListItem
                selectedIndex={this.state.selectedIndex}
                title={rowData.title}
                description={rowData.description}
                people={rowData.people}
                editTitle={newText => this.updateData(rowData._key, {title: newText})}
                onSubmitTitle={() => this.selectedDescription.focus()}
                setDescriptionRef={element => this.selectedDescription = element}
                editDescription={newText => this.updateData(rowData._key, {description: newText})}
              />
              : <InactiveListItem
                title={rowData.title}
                people={rowData.people}
                selectRow={() => this.setState({
                  selectedIndex: rowId,
                })}
              />
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    alignSelf: 'stretch',
  },
})

AppRegistry.registerComponent('harmful', () => utopiaApp)
