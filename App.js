import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Navigator, Route } from './Navigator';

const Screen1 = ({ navigator }) => (
  <View style={[styles.screen, { backgroundColor: '#59C9A5' }]}>
    <Button
      title="Screen 2"
      onPress={() => navigator.push('Screen2')}
    />
    <Button
      title="PopKing"
      onPress={() => navigator.pop()}
    />
  </View>   
);

const Screen2 = ({ navigator }) => {
    return (
        <View style={[styles.screen, { backgroundColor: '#23395B' }]}>
          <Button
            title="Screen 2"
            onPress={() => navigator.push('Screen3')}
          />
          <Button
            title="Pop"
            onPress={() => navigator.pop()}
          />
        </View> 
      );
}

const Screen5 = ({ navigator }) => (
  <View style={[styles.screen, { backgroundColor: '#B9E3C6' }]}>
    <Button
      title="Poppppp1123"
      onPress={() => navigator.pop()}
    /> 
  </View>
);
export default class App extends React.Component {
    render() {
      return ( 
        <Navigator>
          <Route name="Screen1" component={Screen1} />
          <Route name="Screen2" component={Screen2} />
          <Route name="Screen3" component={Screen3} />
        </Navigator>
      );
    }
  }

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
