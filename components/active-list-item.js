import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

function ActiveListItem({
  _data, selectedIndex, people,
  editTitle, onSubmitTitle, setDescriptionRef, editDescription
}) {
  return (
    <View style={styles.activeListItem}>
      <TextInput
        style={styles.title}
        onChangeText={editTitle}
        value={_data[selectedIndex].title}
        autoFocus
        placeholder='New item...'
        onSubmitEditing={onSubmitTitle}
      />
      <TextInput
        ref={setDescriptionRef}
        style={styles.description}
        onChangeText={editDescription}
        value={_data[selectedIndex].description}
        placeholder='Description...'
        multiline
      />
      <View style={styles.peopleContainer}>
        {people.map((name) => (
          <Text style={styles.person} key={name}>{name}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  activeListItem: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    paddingLeft: 9,
  },
  title: {
    fontSize: 16,
    height: 40,
    borderWidth: 0,
  },
  description: {
    fontSize: 14,
    height: 256,
    borderWidth: 0,
  },
  peopleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  person: {
    fontSize: 11,
    backgroundColor: '#D3E8FF',
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 5,
    paddingHorizontal: 5,
  }
})

export default ActiveListItem
