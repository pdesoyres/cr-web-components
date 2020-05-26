import '../../src/guitar-tab/guitar-tab';
import {text, withKnobs} from '@storybook/addon-knobs';

export default {
    title: 'Guitar Tab',
    decorators: [withKnobs],
};

export const emptyGuitarTab = () => '<guitar-tab />';
export const DGuitarTab = () => '<guitar-tab tab="x,x,0,2,3,2" name="D"/>';
export const DUkuleleTab = () => '<guitar-tab tab="2,0,1,0" name="D" stringsCount="4" fretsCount="4"/>';
export const AMenorGuitarTab = () => '<guitar-tab tab="5,7,7,6,5,5" />';
export const editableGuitarTab = () => `<guitar-tab tab="${text('tab', '6,x,6,5,3,3')}" name="${text('name', 'A#13')}"/>`;

