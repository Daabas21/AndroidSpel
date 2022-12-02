import { StyleSheet, View, Pressable, Image, Dimensions} from "react-native"


const Choices = ({ setMyChoice, setBootController }) => {

    const handleChoice = (choice) => {
        setMyChoice(choice)
        setBootController(prev => prev + 1)
    }
    
    return (
        <View style={styles.imagesContainer}>
            <Pressable onPress={() => handleChoice("paper")}>
                <Image source={require("../assets/paper.png")} style={styles.image} />
            </Pressable>
            <Pressable onPress={() => handleChoice("rock")} >
                <Image source={require('../assets/rock.png')} style={styles.image} />
            </Pressable>
            <Pressable onPress={() => handleChoice("scissor")} >
                <Image source={require('../assets/scissor.png')} style={styles.image} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({    
  imagesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    minWidth: Dimensions.get('window').width,
    height: "25%",
  },
  image: {
    height: 120,
    width: 80,
  },
})

export default Choices