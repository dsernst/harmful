import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

function InactiveListItem({title, people, selectRow}) {
  return (
    <TouchableHighlight onPress={selectRow} >
      <View style={styles.unselectedRow}>
        <Text style={styles.unselectedRowTitle}>{title}</Text>
        <Text style={styles.numPeople}>
          {people.length}
          <Image style={styles.peopleIcon} source={require('./people-icon.png')} />
        </Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  unselectedRow: {
    height: 70,
    borderColor: 'grey',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
  },
  unselectedRowTitle: {
    fontSize: 16,
  },
  numPeople: {
    paddingTop: 18,
    paddingRight: 5,
    textAlign: 'right',
    opacity: .8,
    fontSize: 15,
    marginRight: 10,
  },
  peopleIcon: {
    marginTop: 21,
  },
})

export default InactiveListItem
