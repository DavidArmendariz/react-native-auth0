import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({
  domain: 'dev-x5z9pfh6.us.auth0.com',
  clientId: 'wQ1DlWDmAP4O6JbiheiD1jDJkz0aPkYV',
});

const App = () => {
  const [credentials, setCredentials] = useState({accessToken: null});
  const handleLogin = () => {
    auth0.webAuth
      .authorize({scope: 'openid profile email', prompt: 'select_account'})
      .then(auth0Credentials =>
        setCredentials({accessToken: auth0Credentials.accessToken}),
      )
      .catch(error => console.log(error));
  };
  const handleLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        Alert.alert('Logged out!');
        setCredentials({accessToken: null});
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  };
  console.log(credentials);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          {!credentials.accessToken && (
            <View style={styles.button}>
              <Button title="Login" onPress={handleLogin} />
            </View>
          )}
          {credentials.accessToken && (
            <View style={styles.button}>
              <Button title="Logout" onPress={handleLogout} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    padding: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default App;
