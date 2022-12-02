import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

const Result = ({ myChoice, bootChoice, setScore, result, setResult }) => {

    useEffect(() => {
        if(myChoice == "paper" && bootChoice == "paper"){
            setResult("Draw")
        }
        if(myChoice == "rock" && bootChoice == "rock"){
            setResult("Draw")
        }
        if(myChoice == "scissor" && bootChoice == "scissor"){
            setResult("Draw")
        }
        if(myChoice == "paper" && bootChoice == "rock"){
            setResult("Win")
            setScore(prev => prev + 1)
        }
        if(myChoice == "paper" && bootChoice == "scissor"){
            setResult("Lose")
            setScore(prev => prev - 1)
        }
        if(myChoice == "rock" && bootChoice == "scissor"){
            setResult("Win")
            setScore(prev => prev + 1)
        }
        if(myChoice == "rock" && bootChoice == "paper"){
            setResult("Lose")
            setScore(prev => prev - 1)
        }
        if(myChoice == "scissor" && bootChoice == "paper"){
            setResult("Win")
            setScore(prev => prev + 1)
        }
        if(myChoice == "scissor" && bootChoice == "rock"){
            setResult("Lose")
            setScore(prev => prev - 1)
        }
    }, [bootChoice])

    const myImgPick = () => {
        if (myChoice == "paper") {
            return require('../assets/paper.png')
        }
        if (myChoice == "rock") {
            return require('../assets/rock.png')
        }
        if (myChoice == "scissor") {
            return require('../assets/scissor.png')
        }
    }

    const bootImgPick = () => {
        if (bootChoice == "paper") {
            return require('../assets/paper.png')
        }
        if (bootChoice == "rock") {
            return require('../assets/rock.png')
        }
        if (bootChoice == "scissor") {
            return require('../assets/scissor.png')
        }
    }

    return (
        <>
        <View style={styles.result}>
            <View><Text style={styles.font}>Your choice</Text><Image source={myImgPick()} style={styles.image} /></View>
            <View><Text style={styles.font}>Boot choice</Text><Image source={bootImgPick()} style={styles.image} /></View>
        </View>
        <View>
            <Text style={styles.font} >You : {result}</Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    result: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-around',
    },
    font: {
        color: "#FFF",
        fontWeight: "900",
        fontSize: 20
    },
    image: {
      height: 120,
      width: 80,
    },
})

export default Result