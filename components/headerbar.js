import React from 'react'
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native'

function Headerbar({pressComposeButton}) {
  return (
    <View style={styles.headerbar}>
      <Text style={styles.headerbarButton}></Text>
      <Text style={styles.title}>UTOPIA</Text>
      <TouchableHighlight underlayColor='white' onPress={pressComposeButton}>
        <Text style={styles.headerbarButton}>+</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  headerbar: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#1B1B1B',
    borderWidth: 1,
    borderColor: '#979797',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Arial Rounded MT Bold',
    fontWeight: '900',
    fontSize: 20,
    color: '#B2B2B2',
    flex: 1,
  },
  headerbarButton: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 30,
    lineHeight: 20,
    paddingTop: 5,
    color: '#4A90E2',
    width: 50,
    textAlign: 'center',
  },
})

export default Headerbar
