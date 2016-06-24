import React, { Component } from 'react'
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'

class harmful extends Component {

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => (
      ['title', 'description', 'people'].some(key => r1[key] !== r2[key])
    )})
    this.state = {
      selectedIndex: 1,
      selectedDescHeight: 256,
      _data: [
        {
          title: 'Great Pacific Garbage Patch',
          description: 'fooooobarrrr',
          people: [],
        },
        {
          title: 'Duopoly on Political Power',
          description:
  `Only two candidates with a chance of winning. Never effective to run an independent candidate.They're almost always very similar ideologically. Both business candidates.

  Founding father's warnings against a two-party system: http://www.washingtonsblog.com/2011/07/the-founding-fathers-tried-to-warn-us-about-the-threat-from-a-two-party-system.html

  Helpful statements from Noam Chomsky on the subject: https://www.youtube.com/watch?v=QOudyiO238
  `
          ,
          people: [],
        },
        {
          title: 'Rising Income Inequality',
          description: 'fooooobarrrr',
          people: [],
        },
        {
          title: 'Women\'s Leadership Gap',
          description: 'fooooobarrrr',
          people: [],
        },
        {
          title: 'Hard to Understand New Laws',
          description: 'fooooobarrrr',
          people: [],
        },
        {
          title: 'Broken Healthcare System',
          description: 'fooooobarrrr',
          people: [],
        },
      ]
    }
    this.state.dataSource = ds.cloneWithRows(this.state._data)
  }

  updateData(key, newValue) {
    // Update the underlying datastore and remake the list's immutable datasource
    let newData = this.state._data.slice()
    newData[this.state.selectedIndex] = {
      ...newData[this.state.selectedIndex],
      [key]: newValue,
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      _data: newData,
    })
  }

  pressComposeButton() {
    // create new blank item and select it
    let newData = [{title: '', description: '', people: []}].concat(this.state._data)

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      _data: newData,
      selectedIndex: 0,
      selectedDescHeight: 100,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarButton}></Text>
          <Text style={styles.title}>HARMFUL</Text>
          <TouchableHighlight underlayColor='white' onPress={() => this.pressComposeButton()}>
            <Text style={styles.toolbarButton}>+</Text>
          </TouchableHighlight>
        </View>
        <ListView style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionId, rowId) => {
            var rowStyle = [styles.unselectedRow]
            if (Number(rowId) % 2) {
              rowStyle.push({backgroundColor: '#F8F8F8'})
            }
            if (this.state.selectedIndex !== Number(rowId)) {
              // Render an unselected list item
              return <Text style={rowStyle}>{rowData.title}</Text>
            }

            // Render the selected list item
            rowStyle[0] = styles.selectedRow
            return (
              <View style={rowStyle}>
                <TextInput
                  style={styles.selectedTitle}
                  onChangeText={(newText) => {this.updateData('title', newText)} }
                  value={this.state._data[this.state.selectedIndex].title}
                  autoFocus
                  placeholder='New item...'
                  onSubmitEditing={() => this.refs.SelectedItemDescription.focus()}
                />
                <TextInput
                  ref="SelectedItemDescription"
                  style={[styles.selectedDescription, {height: this.state.selectedDescHeight}]}
                  onChange={(event) => {
                    this.setState({selectedDescHeight: event.nativeEvent.contentSize.height})
                  }}
                  onChangeText={(newText) => {this.updateData('description', newText)} }
                  value={this.state._data[this.state.selectedIndex].description}
                  placeholder='Description...'
                  multiline
                />
              </View>
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
  toolbar: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '900',
    fontSize: 20,
    flex: 1,
  },
  toolbarButton: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 30,
    lineHeight: 20,
    paddingTop: 5,
    color: '#4A90E2',
    width: 50,
    textAlign: 'center',
  },
  list: {
    alignSelf: 'stretch',
  },
  unselectedRow: {
    height: 70,
    fontSize: 16,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
  },
  selectedRow: {
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
  },
  selectedTitle: {
    fontSize: 16,
    height: 40,
    borderWidth: 0,
  },
  selectedDescription: {
    fontSize: 14,
    height: 200,
    borderWidth: 0,
  },
})

AppRegistry.registerComponent('harmful', () => harmful)
