"use strict";

// Global Variable
var theFSM = {};

// State Constructor
function State(name) {
    this._name = name;
    this._transition = {}; // state transition table
    this._outputs = {}; // output table
}

// Functions
function initFSM() {
    theFSM._inputs = userInput.inputs;
    theFSM._outputs = userInput.outputs;
    theFSM._states = {};

    for (var i = 0; i < userInput.states.length; i++) {
        theFSM._states[userInput.states[i]] = new State(userInput.states[i]);
    }

    theFSM._numOfState = Object.keys(theFSM._states).length;
    theFSM._resetState = theFSM._states[userInput.resetState];
    theFSM._curState = theFSM._resetState;
}

function setTransition() {
    for (var i = 0; i < userInput.transitionT.length; i++) {
        var cur = userInput.transitionT[i][0];
        var input = userInput.transitionT[i][1];
        var next = userInput.transitionT[i][2];

        input = input.replace(/X/g, "[01]");
        theFSM._states[cur]._transition[input] = next;
    }
}

function setOutput() {
    theFSM._type = userInput.type;

    if (theFSM._type == "moore") {
        for (var i = 0; i < userInput.outputT.length; i++) {
            var cur = userInput.outputT[i][0];
            var out = userInput.outputT[i][1];

            theFSM._states[cur]._outputs = out;
        }
    } else {
        for (var i = 0; i < userInput.outputT.length; i++) {
            var cur = userInput.outputT[i][0];
            var input = userInput.outputT[i][1];
            var out = userInput.outputT[i][2];

            input = input.replace(/X/g, "[01]");
            theFSM._states[cur]._outputs[input] = out;
        }
    }
}

function createFSM() {
    initFSM();
    setTransition();
    setOutput();
}

function getResetState() {
    return theFSM._resetState._name;
}

function getCurState() {
    return theFSM._curState._name;
}

function updateCurState(nextState) {
    theFSM._curState = theFSM._states[nextState];
}

function getCurOut(curIn) {
    if (theFSM._type == "moore") {
        return theFSM._curState._outputs;
    } else {
        if (curIn == "undefined") {
            return "undefined";
        } else {
            for (var input in theFSM._curState._outputs) {
                var pattern = new RegExp(input);
                if (pattern.test(curIn)) {
                    return theFSM._curState._outputs[input];
                }
            }
        }
    }
}

function getNextState(curIn) {
    if (curIn == "undefined") {
        return "undefined";
    } else {
        for (var input in theFSM._curState._transition) {
            var pattern = new RegExp(input);
            if (pattern.test(curIn)) {
                return theFSM._curState._transition[input];
            }
        }
    }
}
