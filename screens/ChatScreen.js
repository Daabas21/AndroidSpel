import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View, ScrollView } from 'react-native'
import MessageInput from '../components/MessageInput'

const ChatScreen = () => {

  const [message, setMessage] = useState([])

  const BASE_URL = "http://10.0.2.2:5000"


  useEffect(() => {
    fetch(`${BASE_URL}/api/messages`)
      .then(res => res.json())
      .then(body => setMessage(body))
  }, [])

  message.map(mes => console.log(mes.message))

  return (
    <>
      <ImageBackground
        style={{ flex: 1}}
        source={{
          uri: 'http://image.freepik.com/free-vector/luxury-ornamental-background-gold-color_.jpg',
        }}>
        <ScrollView>
          {message.map(mes => <Text key={mes.id} style={{}}>{mes.message}</Text>)}
        </ScrollView>
      </ImageBackground>
      <MessageInput setMessage={setMessage} />
    </>
  )
}

export default ChatScreen