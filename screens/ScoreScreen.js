import React, { useEffect } from 'react'
import { Button, DeviceEventEmitter, StyleSheet, Text, View } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { deleteAll, deleteById, findAll } from '../utils/db'

const ScoreScreen = ({ history, setHistory }) => {

  // const [history, setHistory] = useState([])
  const header = ['PlayerChoice', 'BootChoice', 'result']

  const data = history.map(e => [e.playerChoice, e.bootChoice, e.result])

  useEffect(() => {
    findAll()
      .then(res => setHistory(res))
  }, [])

  // console.log(...data)

  const deleteHistory = () => {
    deleteAll()

    findAll()
      .then(res => setHistory(res))
  }

  const deleteId = (id) => {
    deleteById(id)

    findAll()
      .then(res => setHistory(res))
  }

  return (
    <View style={styles.container}>
      <View style={{marginBottom:15}}>
        <Button
          title='Delete all' 
          onPress={deleteHistory}
          color="red"

          />
      </View>
      <View style={{backgroundColor:'lightblue'}}>
      <View style={styles.items}>
        <Text style={styles.textWidth}>YourChoices</Text>
        <Text style={styles.textWidth}>BootChoices</Text>
        <Text style={styles.textWidth}>results</Text>
        <Text style={styles.textWidth}></Text>
      </View>
      </View>
      {history.map(e => (
        <View key={e.id} style={styles.items}>
          <Text style={styles.textWidth}>{e.playerChoice}</Text>
          <Text style={styles.textWidth}>{e.bootChoice}</Text>
          <Text style={styles.textWidth}>{e.result}</Text>
          <Pressable onPress={() => deleteId(e.id)} >
            <Text style={{color:'red', fontWeight:'bold'}}>X</Text>
          </Pressable>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    aspectRatio: 10/1,
  },
  textWidth:{
    width: 115
  }
})

export default ScoreScreen