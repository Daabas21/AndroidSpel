import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Choices from '../components/Choices';
import Header from '../components/Header';
import Result from '../components/Result';
import History from '../entities/History';
import { findAll, insert } from '../utils/db';

export default function MainScreen({ setHistory }) {

  const [myChoice, setMyChoice] = useState("")
  const [bootChoice, setBootChoice] = useState("")
  const [result, setResult] = useState("")
  const [bootController, setBootController] = useState(0)
  const [score, setScore] = useState(0)

  console.log(myChoice)

  const newBootChoice = () => {
    const choices = ["paper", "rock", "scissor"]
    setBootChoice(choices[Math.floor(Math.random() * 3)])
  }

  // console.log('boot choice:', bootChoice)

  useEffect(() => {
    if (myChoice) {
      const timer = setTimeout(() => {
        newBootChoice();
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [bootController])

  const resetChoices = async () => {

    await insert(new History(undefined, myChoice, bootChoice, result))

    findAll()
      .then(res => setHistory(res))

    setMyChoice("")
    setBootChoice("")
    setResult('')
  }

  return (
    <View style={styles.container}>
      <Header score={score} />
      {!myChoice ?
        <Choices
          setMyChoice={setMyChoice}
          setBootController={setBootController} /> :
        <Result
          myChoice={myChoice}
          bootChoice={bootChoice}
          setScore={setScore}
          result={result}
          setResult={setResult} />}
      {myChoice ?
        <Pressable
          style={styles.tryAgain}
          onPress={() => resetChoices()}>
          <Text style={styles.font}>Try Again</Text></Pressable> : null}
      <StatusBar style='auto' backgroundColor='#202020' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    alignItems: 'center',
    marginTop: 30,
  },
  font: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 20
  },
  tryAgain: {
    marginTop: 100
  },
});