import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { Dimensions, TextInput, TouchableOpacity, View } from 'react-native'

const MessageInput = ( {setMessage} ) => {

  const [value, setValue] = useState('');
  const [chat , setChat] = useState({ message: "", private: false, game_id:1})

  const {width} = Dimensions.get('window');

  const handleChange = text => {
    setValue(text);
  }

  useEffect(() => {
    setChat(prev => ({...prev, message : value}))
  },[value])

  const sendMessage = async () => {

    await fetch('http://10.0.2.2:5000/api/messages',{
      method:'POST',
      body: JSON.stringify(chat),
      headers: {'Content-Type': "application/json"},
    })

    setValue("")

    const res = await fetch('http://10.0.2.2:5000/api/messages')
    const data = await res.json()

    setMessage(data)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 0,
        maxHeight: 100,
        padding: 5,
        width,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          width: width - 60,
          borderRadius: 25,
          elevation: 2,
        }}>
        <TextInput
          value={value}
          onChangeText={handleChange}
          style={{height: '100%', paddingHorizontal: 10, fontSize: 18}}
          multiline
          placeholder="Enter message..."
        />
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 5,
          bottom: 5,
          justifyContent: 'center',
          alignItems: 'center',
          width: 45,
          height: 45,
          backgroundColor: 'green',
          borderRadius: 24,
          elevation: 2,
        }}
        onPress={sendMessage}
        >
        {value.trim() ? (
          <Feather size={25} name="send" color="white"/>
        ) : (
          <Feather size={25} name="mic" color="white" />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default MessageInput