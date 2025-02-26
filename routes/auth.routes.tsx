import Login from "../screens/Login";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

type StackNavigation = {
  Login: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;
export type LoginProps = NativeStackScreenProps<StackNavigation, "Login">;

const { Navigator, Screen } = createNativeStackNavigator<StackNavigation>();

const AuthRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};

export default AuthRoutes;
