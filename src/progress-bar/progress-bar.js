import {LitElement, html, css} from 'lit-element';

/**
 * Simple horizontal progress bar
 */
export class ProgressBar extends LitElement {
    constructor() {
        super();
        this.value = 0;
    }

    static get properties() {
        return {
            value: { type: Number }
        };
    }

    static get styles() {
        return [
            css`
                :host {
                  --progress-bar-bg-color: #888888;
                  --progress-bar-padding: 1px;
                  --progress-bar-height: 20px;
                  --progress-bar-track-color: #B9B9B9;
                }
                .progress-bar {
                    background-color: var(--progress-bar-bg-color);
                    padding: var(--progress-bar-padding);
                }
                
                .progress-bar-track {
                    height: var(--progress-bar-height);
                    background-color: var(--progress-bar-track-color);
                }
            `,
        ];
    }

    render() {
        return html`<div class="progress-bar"><div class="progress-bar-track" style="width: ${this.value}%"></div></div>`;
    }
}

window.customElements.define('progress-bar', ProgressBar);