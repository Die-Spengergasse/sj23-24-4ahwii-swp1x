import { Component } from "./component.mjs";
import { HashSet } from "./hashset.mjs";
class Bunny extends Component {
    actions;
    posX;
    posY;
    interval;
    constructor(dom) {
        super(dom);
        this.posX = 1;
        this.poxY = 1;
        this.actions = new HashSet();
        this.actions.add("start");
        this.actions.add("jump");
    }
    registerSelect(select) {
        this.select = select;
        select.setOptions(this.actions.toArray());
    }
    act(action, x, y) {
        // interface offered to the select
        switch (action) {
            case "start":
                this.#start(x);
                break;
            case "jump":
                this.#jump(x, y);
                break;
            case "stop":
                this.#stop();
                break;
            default:
                throw new Error(`Unknown action '${action}'`);
        }
    }
    #start(ms = 1000) {
        this.actions.remove("start");
        this.actions.add("stop");
        this.select.setOptions(this.actions.toArray());
        this.#hopOne();
        this.interval = setInterval(() => {
            this.#hopOne();
        }, ms);
    }

    #stop() {
        this.actions.remove("stop");
        this.actions.add("start");
        this.select.setOptions(this.actions.toArray());
        clearInterval(this.interval);
    }
    #jump(x, y) {
        // TODO Parameterprfg
        this.posX = x;
        this.posY = y;
        this.dom.style.gridColumnStart = x;
        this.dom.style.gridRowStart = y;
    }
    #hopOne() {
        let x = this.posX + 1;
        let y = this.posY;
        if (x > 7) {
            y++;
            x = 1;
        }
        if (y > 7) {
            y = 1;
        }
        this.#jump(x, y);
    }
}
export { Bunny };
