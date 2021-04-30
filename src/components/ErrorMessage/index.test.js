// Link.react.test.js
import React, {useState} from 'react';
import renderer from 'react-test-renderer';
import { testEnvironment } from '../../../jest.config';
import Index from './index'


test('ErrorMessage.Index Snapshot Test', () => {
    const component = renderer.create(
        <Index />

    );
let tree = component.toJSON();
expect(tree).toMatchSnapshot()
});