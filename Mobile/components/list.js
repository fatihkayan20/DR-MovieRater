import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MovieList(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.102:8000/api/movies/", {
      method: "GET",
      headers: {
        Authorization: `Token a4729dcd93c7ddb510693ec57fcb299733dc5804`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setMovies(res))
      .then(console.log("a"))
      .catch((err) => console.log(err));

  }, []);

  const movieClicked = (movie) => {
    props.navigation.navigate("Detail", {movie:movie,title:movie.title})
  }

  return (
    <View style={{ paddingTop: 30 }}>
      <Image
        source={require("../assets/rater.png")}
        style={{ width: "100%", height: 135, paddingTop: 30 }}
        resizeMode="contain"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => movieClicked(item)}>
            <View style={styles.item}>
              <Text style={styles.itemText}> {item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    padding: 10,
    height: 50,
    backgroundColor: "#282C35",
  },

  itemText: {
    color: "#fff",
    fontSize: 24,
  },
});
