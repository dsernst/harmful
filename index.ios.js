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
import exampleData from './example-data.js'

class harmful extends Component {

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true})
    this.state = {
      selectedIndex: '1',
      _data: exampleData,
    }
    this.state.dataSource = ds.cloneWithRows(this.state._data)
  }

  pressComposeButton() {
    // create new blank item and select it
    let newData = [{title: '', description: '', people: []}].concat(this.state._data)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      _data: newData,
      selectedIndex: '0',
    })
  }

  updateData(key, newValue) {
    if (typeof index === 'undefined') index = this.state.selectedIndex

    // Update the underlying datastore and remake the list's immutable datasource
    let newData = this.state._data.slice()
    newData[index] = {
      ...newData[index],
      [key]: newValue,
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      _data: newData,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Headerbar pressComposeButton={() => this.pressComposeButton()} />
        <ListView style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionId, rowId) => {
            if (this.state.selectedIndex !== rowId) {
              // Render an unselected list item
              return <InactiveListItem
                title={rowData.title}
                people={rowData.people}
                selectRow={() => this.setState({
                  selectedIndex: rowId,
                  dataSource: this.state.dataSource.cloneWithRows(this.state._data),
                })}
              />
            }

            // Render the selected list item
            return (
              <ActiveListItem
                _data={this.state._data}
                selectedIndex={this.state.selectedIndex}
                people={rowData.people}
                editTitle={newText => this.updateData('title', newText)}
                onSubmitTitle={() => this.selectedDescription.focus()}
                setDescriptionRef={element => this.selectedDescription = element}
                editDescription={newText => this.updateData('description', newText)}
              />
            )
          }}
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

AppRegistry.registerComponent('harmful', () => harmful)
