import { Component } from "./component.mjs";
class Select extends Component {
    bunny;
    options;
    constructor(dom) {
        super(dom);
        this.dom.addEventListener("submit", (event) => {
            console.log("submit");
        });
    }
    registerBunny(bunny) {
        this.bunny = bunny;
        bunny.registerSelect(this);
        this.dom.addEventListener("change", this.change.bind(this));
    }
    change() {
        let action = this.dom.value;
        if (!this.options.includes(action)) {
            throw new Error(`Unavailalble option '${this.dom.value}'`);
        }
        switch (action) {
            case "start":
                this.bunny.act("start", this.ms);
                break;
            case "stop":
                this.bunny.act("stop");
                break;
            case "jump":
                this.bunny.act("jump", this.posX, this.posY);
                break;
            default:
                throw new Error(`Unknown action '${action}'`);
        }
    }
    setOptions(options) {
        // Array with names
        this.dom.innerHTML = "";
        this.options = options;
        ["select action: ", ...options].forEach((option) => {
            const optionDom = document.createElement("option");
            optionDom.value = option;
            optionDom.innerText = option;
            this.dom.appendChild(optionDom);
        });
    }
    setPosXSrc(posXSrc) {
        this.posXSrc = posXSrc;
    }
    get posX() {
        return Number(this.posXSrc.value);
    }
    setPosYSrc(posYSrc) {
        this.posYSrc = posYSrc;
    }
    get posY() {
        return Number(this.posYSrc.value);
    }
    setMSSrc(mSSrc) {
        this.mSSrc = mSSrc;
    }
    get ms() {
        return Number(this.mSSrc.value);
    }
}
export { Select };
