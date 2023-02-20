import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Login from './Screens/Login';
import SignUp from './Screens/Signup';
import {useDispatch, useSelector} from 'react-redux';
import Footer from './Components/Footer';
import Police from './Screens/Police';
import Ambulance from './Screens/Ambulance';
import Firebrigade from './Screens/Firebrigade';
import Logout from './Screens/Logout';
import {getUser} from './Redux/Actions/loginuser';
import Loader from './Components/Loader';
import styles from './Styling';

function AppRouter() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const {isAuthenticated, userLoading} = useSelector(state => state.auth);

  return userLoading ? (
    <Loader color="green" style={styles.flexCenter} size="large" />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUp}
        />
        <Stack.Screen
          name="LogIn"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="home"
          options={{headerShown: false}}
          component={Home}
        />
        <Stack.Screen
          name="police"
          options={{headerShown: false}}
          component={Police}
        />
        <Stack.Screen
          name="ambulance"
          options={{headerShown: false}}
          component={Ambulance}
        />
        <Stack.Screen
          name="firebrigade"
          options={{headerShown: false}}
          component={Firebrigade}
        />
        <Stack.Screen
          name="logout"
          options={{headerShown: false}}
          component={Logout}
        />
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
}

export default AppRouter;
