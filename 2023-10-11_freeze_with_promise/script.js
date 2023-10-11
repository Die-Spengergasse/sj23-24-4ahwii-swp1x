"use strict";

var y;
const maxlogs = 3;
var count = 0;
var startDate = undefined;

async function x() {
    throw new Error("throw in x");
}

function go() {
    startDate = new Date();
    count = 0;
    bad("First call");
}
function good(data) {
    console.log("good called with data: ", data);
}

function bad(data) {
    if (new Date().valueOf() - startDate > 7000) {
        // dont freeze forever
        console.info("not continuing the terror");
        return;
    }
    if (count++ < maxlogs) {
        console.log("bad called with data: ", data);
    }
    y = x(); // y: Promise Objekt
    y.then(good, bad);
}
