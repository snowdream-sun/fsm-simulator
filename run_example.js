"use strict";

// Functions
function changeInput() {
    var curIn = document.getElementById("curIn").value;

    document.getElementById("curOut").innerHTML = getCurOut(curIn);
    document.getElementById("nextState").innerHTML = getNextState(curIn);
}

function updatePanel() {
    document.getElementById("curState").innerHTML = getCurState();
    changeInput();
}

function activeClkEdge() {
    updateCurState(document.getElementById("nextState").innerHTML);
    updatePanel();
}

function asyncReset() {
    updateCurState(getResetState());
    document.getElementById("curIn").value = "undefined";
    updatePanel();
}

function displayVerilog() {
    document.getElementById("hdl").innerHTML = writeVerilog();
}

// Events
document.getElementById("curIn").onchange = changeInput;
document.getElementById("clkEdge").onclick = activeClkEdge;
document.getElementById("reset").onclick = asyncReset;
document.getElementById("verilog").onclick = displayVerilog;

// Running
createFSM();
updatePanel();
