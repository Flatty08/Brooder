import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";
import Header from "./screens/Components/Header";
import Home from "./screens/Home";
import Reports from "./screens/Reports";
import ViewReport from "./screens/ViewReport";
import ActivityLogs from "./screens/ActivityLogs";
import CustomTabBar from "./screens/Components/BottomNavigation";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Placeholder = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Coming Soon</Text>
  </View>
);

function ReportsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportsList" component={Reports} />
      <Stack.Screen name="ViewReport" component={ViewReport} />
    </Stack.Navigator>
  );
}

function ActivityLogsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActivityLogsList" component={ActivityLogs} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Header />
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <CustomTabBar {...props} />}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="home"
                  size={22}
                  color={focused ? "#1e40af" : "#1a1a1a"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Control"
            component={Placeholder}
            options={{
              tabBarLabel: "Control",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="sliders"
                  size={22}
                  color={focused ? "#1e40af" : "#1a1a1a"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Analytics"
            component={Placeholder}
            options={{
              tabBarLabel: "Analytics",
              tabBarIcon: ({ focused }) => (
                <Icon
                  name="bar-chart-2"
                  size={22}
                  color={focused ? "#1e40af" : "#1a1a1a"}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Reports"
            component={ReportsStack}
            options={{
              tabBarButton: () => null,
            }}
          />
          <Tab.Screen
            name="ActivityLogs"
            component={ActivityLogsStack}
            options={{
              tabBarButton: () => null,
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
