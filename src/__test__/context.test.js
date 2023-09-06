import React, {Component} from 'react';
import renderer from 'react-test-renderer';
import {LDContextProvider, LDContext} from '../context';
import {TouchableOpacity, Text, View} from 'react-native';

describe('LDContextProvider', () => {
  it('should update ldResponse using setLdResponse', () => {
    const TestComponent = () => {
      const {ldResponse, setLdResponse} = React.useContext(LDContext);

      const updateLdResponse = () => {
        setLdResponse(['new', 'ldResponse', 'values']);
      };

      return (
        <TouchableOpacity onPress={updateLdResponse} testID={'ld-response'}>
          <Text>Update LD Response</Text>
        </TouchableOpacity>
      );
    };

    const rootComponent = renderer.create(
      <LDContextProvider>
        <TestComponent />
      </LDContextProvider>,
    );
    const touchable = rootComponent.root.findByType(TouchableOpacity);
    expect(touchable).toBeTruthy();
    touchable.props.onPress();
  });
});

describe('Snapshot for context', () => {
  it('renders snapshot without issues', () => {
    renderer.create(<LDContextProvider />);
    const scomponent = renderer
      .create(
        <LDContextProvider>
          <View>
            <Text>children here</Text>
          </View>
        </LDContextProvider>,
      )
      .toJSON();
    expect(scomponent).toMatchSnapshot();
  });
});
