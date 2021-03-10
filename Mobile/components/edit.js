import React, { useState, useEffect } from "react";
import { StyleSheet, View,Text, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function Edit(props) {
  const movie = props.navigation.getParam("movie", null);
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  

  const saveClick = () =>{
    fetch(`http://192.168.1.102:8000/api/movies/${movie.id}/`, {
      method: "PUT",
      headers: {
        'Authorization': `Token a4729dcd93c7ddb510693ec57fcb299733dc5804`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      })
    })
      .then((res) => res.json())
      .then((movie) => {
        props.navigation.navigate("Detail", {movie:movie,title:movie.title})
      })
      .catch((err) => console.log(err));
  }
  return (
    <View style={styles.container}>
  
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Button 
            onPress={() => saveClick()}
            title="Save"
        />
      
    </View>
  );
}

Edit.navigationOptions = (screenProps) => ({
  title: "Edit  " + screenProps.navigation.getParam("title"),
  headerStyle: {
    backgroundColor: "orange",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  headerTitleAlign: "center",
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
    paddingTop: 30,
  },

  movieTitle: {
    marginBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  label:{
    fontSize: 24,
    backgroundColor: "#fff",
    margin: 10,
  },

  input: {
    fontSize: 24,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
    margin: 10,
  },
  formRow:{
      flexDirection:'column'
  }
});
