import { StyleSheet, View, Text } from "react-native"


const Header = ({ score}) => {
  return (
    <View style={styles.ScoreContainer}>
        <View>
          <Text style={styles.font}>Paper</Text>
          <Text style={styles.font}>Rock</Text>
          <Text style={styles.font}>Scissor</Text>
        </View>
        <View>
          <Text style={styles.font}>Score :</Text>
          <Text style={styles.font}>{score}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({   
  ScoreContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    width:"90%",
    margin:50,
    padding:10,
    borderWidth:2,
    borderRadius:30,
    borderColor:"white",
  },
  font:{
    color:"#FFF",
    fontWeight:"900",
    fontSize:20
  },
})

export default Header