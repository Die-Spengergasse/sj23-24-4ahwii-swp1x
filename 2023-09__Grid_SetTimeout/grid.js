import { Bunny } from "./bunny.mjs";
import { Select } from "./select.mjs";

const bunny = new Bunny(document.querySelector("#bunny"));
// const grid = document.querySelector("#grid");
const select = new Select(document.querySelector("#select"));
select.setPosXSrc(document.querySelector("#posX"));
select.setPosYSrc(document.querySelector("#posY"));
select.setMSSrc(document.querySelector("#mS"));
select.registerBunny(bunny);
