import React from 'react';
import MovieList from './components/list';
import Detail from './components/detail';
import Edit from './components/edit';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const AppNavigator =createStackNavigator({
  MovieList: {screen: MovieList, navigationOptions:{title:"Movie Rater - Movies"}},
  Detail: {screen: Detail},
  Edit : {screen: Edit}
})

const App = createAppContainer(AppNavigator);


export default App;


