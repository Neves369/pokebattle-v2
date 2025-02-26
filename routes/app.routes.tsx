import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Battle from "../screens/Battle";
import WinOrLoseScreen from "../screens/WinOrLose";
import TeamSelection from "../screens/TeamSelection";
import ConnectScreen from "../screens/Connect";

type StackNavigation = {
  Battle: undefined;
  TeamSelection: undefined;
  WinOrLose: undefined;
  Connect: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;
export type BattleProps = NativeStackScreenProps<StackNavigation, "Battle">;
export type TeamSelectionProps = NativeStackScreenProps<
  StackNavigation,
  "TeamSelection"
>;

export type WinOrLoseProps = NativeStackScreenProps<
  StackNavigation,
  "WinOrLose"
>;

export type ConnectProps = NativeStackScreenProps<StackNavigation, "Connect">;

const { Navigator, Screen } = createNativeStackNavigator<StackNavigation>();

const AppRoutes = () => {
  return (
    <Navigator initialRouteName="TeamSelection">
      <Screen
        name="TeamSelection"
        component={TeamSelection}
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
      <Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
      <Screen
        name="Battle"
        component={Battle}
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
      <Screen
        name="WinOrLose"
        component={WinOrLoseScreen}
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
    </Navigator>
  );
};

export default AppRoutes;
