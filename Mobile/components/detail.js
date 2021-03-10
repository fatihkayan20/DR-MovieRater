import React ,{useState,useEffect} from "react";
import { StyleSheet, Text, View, Button,Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

export default function Detail(props) {
  const mov = props.navigation.getParam("movie", null);
  const [movie,setMovie] = useState(mov);
  const [highlight , setHighlight] = useState(0);
  
  useEffect(() => {
    fetch(`http://192.168.1.102:8000/api/movies/${movie.id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token a4729dcd93c7ddb510693ec57fcb299733dc5804`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setMovie(res))
      .then(console.log("a"))
      .catch((err) => console.log(err));

  }, []);


  const rateClicked= () => {
    fetch(`http://192.168.1.102:8000/api/movies/${movie.id}/rate_movie/`, {
      method: "POST",
      headers: {
        Authorization: `Token a4729dcd93c7ddb510693ec57fcb299733dc5804`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stars:highlight
      })
    })
      .then((res) => res.json())
      .then((res) =>{
        setHighlight(0)
        Alert.alert("Rating",res.message)})
      .catch((err) => Alert.alert("Error",err.message));

  }

  return (
    <View style={styles.container}>
      <Text>{movie.description} </Text>
      <View style={styles.stars}>
        {[...Array(5)].map((e, i) => {
          return (
            <FontAwesomeIcon
              style={
                movie.avg_rating > i ? styles.starsOrange : styles.starsRed
              }
              icon={
                movie.avg_rating < i + 1 && movie.avg_rating > i
                  ? faStarHalf
                  : faStar
              }
              key={i}
            />
          );
        })}
        <Text style={{ marginLeft: 10 }}>({movie.no_of_ratings}) </Text>
      </View>
      <View
        style={{
          width: "110%",
          marginTop: 50,
          borderBottomWidth: 2,
          borderBottomColor: "black",
        }}
      />
      <Text>Rate It</Text>

      <View style={styles.stars}>
        <FontAwesomeIcon
          style={highlight >0 ? styles.starsPuple : styles.starsRed}
          icon={faStar}
          size={25}
          onPress={() => setHighlight(1)}
        />
        <FontAwesomeIcon
          style={highlight >1 ? styles.starsPuple : styles.starsRed}
          icon={faStar}
          size={25}
          onPress={() => setHighlight(2)}
        />
        <FontAwesomeIcon
          style={highlight >2  ? styles.starsPuple : styles.starsRed}
          icon={faStar}
          size={25}
          onPress={() => setHighlight(3)}
        />
        <FontAwesomeIcon
          style={highlight >3 ? styles.starsPuple : styles.starsRed}
          icon={faStar}
          size={25}
          onPress={() => setHighlight(4)}
        />
        <FontAwesomeIcon
          style={highlight >4 ? styles.starsPuple : styles.starsRed}
          icon={faStar}
          size={25}
          onPress={() => setHighlight(5)}
        />
      </View>
      <Button title='Rate' onPress={() => rateClicked()} />
    </View>
  );
}

Detail.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("title"),
  headerStyle: {
    backgroundColor: "orange",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  headerTitleAlign: "center",
  headerRight: () => (
    <Button
      title="Edit"
      color="White"
      onPress={() =>
        screenProps.navigation.navigate("Edit", {
          movie: screenProps.navigation.getParam("movie"),
          title: screenProps.navigation.getParam("title"),
        })
      }
    />
  ),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
    alignItems: "center",
    paddingTop: 30,
  },
  stars: {
    flexDirection: "row",
    marginTop:20
  },
  starsOrange: {
    color: "orange",
  },
  starsWhite: {
    color: "white",
  },
  starsPuple:{
    color:'purple'
  },
  movieTitle: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
});
