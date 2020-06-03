import '../../src/guitar-chord/guitar-chord';
import {text, number, withKnobs} from '@storybook/addon-knobs';

export default {
    title: 'Guitar Chord',
    decorators: [withKnobs],
};

export const emptyGuitarChord = () => '<guitar-chord />';
export const DGuitarChord = () => '<guitar-chord chord="x,x,0,2,3,2" name="D"/>';
export const DUkuleleChord = () => '<guitar-chord chord="2,0,1,0" name="D" stringsCount="4" fretsCount="4"/>';
export const AmGuitarChord = () => '<guitar-chord chord="5,7,7,6,5,5" />';
export const editableGuitarChord = () => `<guitar-chord 
    chord="${text('tab', '6,x,6,5,3,3')}" 
    name="${text('name', 'A#13')}"
    visibleFretsCount="${number('visibleFretsCount', 5)}"/>`;

