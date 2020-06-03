import {LitElement} from 'lit-element';

/**
 * Simple horizontal progress bar
 */
export class GuitarChord extends LitElement {

    constructor() {
        super();
        this.name = '';
        this.width = 80;
        this.height = 120;
        this.stringsCount = 6;
        this.fretsCount = 5;
        this.chord = '';
    }

    static get properties() {
        return {
            name: {type: String},
            chord: {type: String},
            stringsCount: {type: Number},
            fretsCount: {type: Number}
        };
    }

    set chord(chord) {
        // todo : validate that given chord string is a valid chord model
        this._chord = chord;
        this._chordModel = ChordModel.parse(chord);
    }

    get chord() {
        return this._chord;
    }

    _getNoteRadius() {
        return Math.min(
            (this.width - 1) / (this.stringsCount - 1),
            (this.height - 5) / (this.fretsCount + 1)
        ) / 3;
    }

    render() {
        const canvas = window.document.createElement("canvas");
        canvas.setAttribute('height', this.height);
        canvas.setAttribute('width', this.width);
        const ctx = canvas.getContext("2d");


        const noteRadius = this._getNoteRadius();

        const fretboardTopMargin = 2 + 10 + noteRadius * 2 + 2;
        const fretboardLeftMargin = noteRadius + 2;
        const fretboardRightMargin = Math.max(noteRadius + 2, 16);

        const fretboardX = fretboardLeftMargin;
        const fretboardY = fretboardTopMargin;
        const fretboardWidth = this.width - fretboardLeftMargin - fretboardRightMargin;
        const fretboardHeight = this.height - fretboardY;


        ctx.fillStyle = "#CECECE";
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.fillStyle = "#666666";

        // chord name
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.name, this.width / 2, 12);

        // nut
        const nutHeight = 4;
        ctx.fillRect(fretboardX, fretboardY, fretboardWidth, nutHeight);


        const minFret = this._chordModel.notes.reduce((previous, current) => current <= 0 ? previous : Math.min(previous, current), 100000) || 0;
        const maxFret = this._chordModel.notes.reduce((previous, current) => Math.max(previous, current), 0) || this.fretsCount - 1;
        let firstFret = 1;
        if (maxFret > this.fretsCount) {
            firstFret = minFret - 1;
        }

        // frets
        const lastFretBottomPadding = 4;
        const fretGap = (fretboardHeight - nutHeight - 1 - lastFretBottomPadding) / this.fretsCount;
        ctx.font = "10px Arial";
        ctx.textAlign = "left";
        for (let i = 1; i < this.fretsCount + 1; i++) {
            const y = fretboardY + nutHeight - 1 + fretGap * i;
            ctx.fillRect(fretboardX, y, fretboardWidth, 1);

            ctx.fillText('' + (i + firstFret - 1), fretboardX + fretboardWidth + 2, y + 5);
        }

        // strings
        const gap = (fretboardWidth - 1) / (this.stringsCount - 1);
        for (let i = 0; i < this.stringsCount; i++) {
            ctx.fillRect(fretboardX + gap * i, fretboardY, 1, fretboardHeight);
        }

        // notes
        ctx.fillStyle = "#000000";
        this._chordModel.notes.forEach((n, i) => {
            if (n === -1) {
                const left = fretboardX + gap * i - noteRadius + 2;
                const right = fretboardX + gap * i - noteRadius + noteRadius * 2 - 2;
                const top = fretboardY - noteRadius * 2;
                const bottom = fretboardY - 4;

                ctx.beginPath();
                ctx.moveTo(left, top);
                ctx.lineTo(right, bottom);
                ctx.stroke();
                ctx.moveTo(right, top);
                ctx.lineTo(left, bottom);
                ctx.stroke();
            } else if (n === 0) {
                ctx.beginPath();
                ctx.arc(fretboardX + gap * i, fretboardY - noteRadius - 2, noteRadius - 2, 0, 2 * Math.PI, false);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.arc(fretboardX + gap * i, fretboardY + nutHeight + fretGap / 2 + (n - firstFret + 1 - 1) * fretGap, noteRadius, 0, 2 * Math.PI, false);
                ctx.fill();
            }
        });


        return canvas;
    }
}

export class ChordModel {
    /**
     * parse given str into a ChordModel object. str is expected to be the comma separated value of the positions of each strings.
     * x, X means a string not played., 0 means a string played without fretting a note. 1 means fretting on the first fret.
     * @param {String} str
     * @returns {ChordModel}
     */
    static parse(str) {
        let notes = str.split(',').map(e => {
            if (e === 'x' || e === 'X') {
                return -1;
            }
            return Number.parseInt(e);
        });


        return new ChordModel(notes);
    }

    /**
     * @param {Array<Number>} notes
     */
    constructor(notes) {
        this.notes = notes;
    }
}


window.customElements.define('guitar-chord', GuitarChord);