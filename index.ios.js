import React, { Component } from 'react'
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

import Headerbar from './components/headerbar'
import InactiveListItem from './components/inactive-list-item.js'

class harmful extends Component {

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true})
    this.state = {
      selectedIndex: '1',
      _data: [
        {
          title: 'Great Pacific Garbage Patch',
          description: '',
          people: ['1', '2', '3'],
        },
        {
          title: 'Duopoly on Political Power',
          description:
`Only two candidates with a chance of winning. Never effective to run an independent candidate.They're almost always very similar ideologically. Both business candidates.

Founding father's warnings against a two-party system: http://www.washingtonsblog.com/2011/07/the-founding-fathers-tried-to-warn-us-about-the-threat-from-a-two-party-system.html

Helpful statements from Noam Chomsky on the subject: https://www.youtube.com/watch?v=QOudyiO238
`
          ,
          people: ['Daniel Clough', 'Tom Bralower', 'Sean Sackett-Ferguson'],
        },
        {
          title: 'Rising Income Inequality',
          description: '',
          people: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42'],
        },
        {
          title: 'Women\'s Leadership Gap',
          description: '',
          people: ['1', '2', '3', '4', '5', '6', '7', '8'],
        },
        {
          title: 'Hard to Understand New Laws',
          description: '',
          people: [],
        },
        {
          title: 'Broken Healthcare System',
          description: '',
          people: [],
        },
        {
          title: 'Rising levels of Mass Shootings',
          description: '',
          people: [],
        },
        {
          title: 'Anti-scientific Attitudes from Leaders',
          description: '',
          people: [],
        },
        {
          title: 'Huge levels distrust in the political system',
          description: '',
          people: [],
        },
      ]
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
            var rowStyle = []
            if (this.state.selectedIndex !== rowId) {
              // Render an unselected list item
              return <InactiveListItem title={rowData.title} people={rowData.people}
                selectRow={() => this.setState({
                  selectedIndex: rowId,
                  dataSource: this.state.dataSource.cloneWithRows(this.state._data),
                })}
              />
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
                  onSubmitEditing={() => this.selectedDescription.focus()}
                />
                <TextInput
                  ref={(element) => this.selectedDescription = element}
                  style={styles.selectedDescription}
                  onChangeText={(newText) => {this.updateData('description', newText)} }
                  value={this.state._data[this.state.selectedIndex].description}
                  placeholder='Description...'
                  multiline
                />
              <View style={styles.selectedPeopleContainer}>
                  {rowData.people.map((name) => (
                    <Text style={styles.selectedPerson} key={name}>{name}</Text>
                  ))}
                </View>
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
  list: {
    alignSelf: 'stretch',
  },
  selectedRow: {
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingLeft: 9,
  },
  selectedTitle: {
    fontSize: 16,
    height: 40,
    borderWidth: 0,
  },
  selectedDescription: {
    fontSize: 14,
    height: 256,
    borderWidth: 0,
  },
  selectedPeopleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  selectedPerson: {
    fontSize: 11,
    backgroundColor: '#D3E8FF',
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
  }
})

AppRegistry.registerComponent('harmful', () => harmful)
