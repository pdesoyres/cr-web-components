import '../../src/progress-bar/progress-bar';
import {number, color, withKnobs} from '@storybook/addon-knobs';


export default {
    title: 'Progress bar',
    decorators: [withKnobs],
};

export const completedProgressBar = () => '<progress-bar value="100" />';
export const emptyProgressBar = () => '<progress-bar value="0" />';
export const defaultProgressBar = () => '<progress-bar />';
export const withValueProgressBar = () => `<progress-bar value="${number('value', 0, {range: true, min:0, max:100})}"/>`;
export const withCssProgressBar = () => `<progress-bar value="20" 
    style="
        --progress-bar-bg-color:${color('--progress-bar-bg-color', '#003366', 'css')};
        --progress-bar-track-color:${color('--progress-bar-track-color', '#FF6633', 'css')};
        --progress-bar-padding:${number('--progress-bar-padding', 1, {min: 0}, 'css')}px;
        --progress-bar-height:${number('--progress-bar-height', 20, {min: 0}, 'css')}px;
        "
    />`;
