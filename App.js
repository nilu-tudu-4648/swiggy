import React from "react";
import { Provider } from "react-redux";
import StackNavigator from "./StackNavigator";
import store from "./store";

export default function App() {
  //npx expo start --dev-client
  //eas build -p android --profile preview
  //eas build --profile development --platform android
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

