import React from "react";
import { Provider } from "react-redux";
import StackNavigator from "./StackNavigator";
import store from "./store";

import { Provider as PaperProvider } from 'react-native-paper';
export default function App() {
  //npx expo start --dev-client
  //eas build -p android --profile preview
  //eas build --profile development --platform android
  return (
    <PaperProvider>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </PaperProvider>
  );
}
// get ColorPropType(): $FlowFixMe {
//   return require('deprecated-react-native-prop-types').ColorPropType;
// },

// get EdgeInsetsPropType(): $FlowFixMe {
//   return require('deprecated-react-native-prop-types').EdgeInsetsPropType;
// },

// get PointPropType(): $FlowFixMe {
//   return require('deprecated-react-native-prop-types').PointPropType;
// },

// get ViewPropTypes(): $FlowFixMe {
//   return require('deprecated-react-native-prop-types').ViewPropTypes;
// },

