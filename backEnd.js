"use strict";

// FSM Constructor
function FSM() {
    var _inputs = [];
    var _outputs = [];
    var _states = [];
    var _resetState = 0;
    var _isMoore = false;

    var _curState = 0; // will be changed during simulation

    this.init = function(inputs, outputs, states, resetState) {
        _inputs = inputs;
        _outputs = outputs;
        _resetState = resetState;
        _curState = resetState;

        for (var i = 0; i < states.length; i++) {
            _states[i] = new State(states[i]);
        }
    }

    this.setMachineType = function(isMoore) {
        _isMoore = isMoore;
    }

    this.changeCurState = function(curState) {
        _curState = curState;
    }

    this.getInputs = function() {return _inputs;}
    this.getOutputs = function() {return _outputs;}
    this.numOfStates = function() {return _states.length;}
    this.getStateById = function(index) {return _states[index];}
    this.getResetState = function() {return _states[_resetState];}
    this.getResetStateId = function() {return _resetState;}
    this.isMoore = function() {return _isMoore;}

    this.getCurState = function() {return _states[_curState];}
}

// State Constructor
function State(name) {
    var _name = name;
    var _transitionT = {}; // state transition table
    var _outputT = {}; // output table

    this.setTransition = function(input, nextState) {
        input = input.replace(/X/g, "[01]");
        _transitionT[input] = nextState;
    }

    this.setMealyOutput = function(input, output) {
        input = input.replace(/X/g, "[01]");
        _outputT[input] = output;
    }
    this.setMooreOuput = function(output) {
        _outputT = output;
    }

    this.getName = function() {return _name;}
    this.getMooreOutput = function() {return _outputT;}

    this.getNextState = function(input) {
        var patterns = Object.keys(_transitionT);

        for (var i = 0; i < patterns.length; i++) {
            var patt = new RegExp(patterns[i]);
            if (patt.test(input)) {
                return _transitionT[patterns[i]];
            }
        }
    }
    this.getMealyOutput = function(input) {
        var patterns = Object.keys(_outputT);

        for (var i = 0; i < patterns.length; i++) {
            var patt = new RegExp(patterns[i]);
            if (patt.test(input)) {
                return _outputT[patterns[i]];
            }
        }
    }
}

// Global Variable
var myFSM = new FSM();

// Functions
function initFSM() {
    myFSM.init(inputs_UI, outputs_UI, states_UI, resetState_UI);
}

function setTransition() {
    var curState = 0;
    var input = "";
    var nextState = 0;

    for (var i = 0; i < transitionT_UI.length; i++) {
        curState = transitionT_UI[i][0];
        input = transitionT_UI[i][1];
        nextState = transitionT_UI[i][2];

        myFSM.getStateById(curState).setTransition(input, nextState);
    }
}

function setOutput() {
    var curState = 0;
    var input = "";
    var output = "";

    myFSM.setMachineType(isMoore_UI);

    if (isMoore_UI) {
        for (var i = 0; i < outputT_UI.length; i++) {
            curState = outputT_UI[i][0];
            output = outputT_UI[i][1];
            myFSM.getStateById(curState).setMooreOuput(output);
        }
    } else {
        for (var i = 0; i < outputT_UI.length; i++) {
            curState = outputT_UI[i][0];
            input = outputT_UI[i][1];
            output = outputT_UI[i][2];
            myFSM.getStateById(curState).setMealyOuput(input, output);
        }
    }
}

function displaySpecs() {
    var stateList = "";
    var type = (myFSM.isMoore()) ? "Moore" : "Mealy";

    for (var i = 0; i < myFSM.numOfStates(); i++) {
        stateList += myFSM.getStateById(i).getName();
        if (i < myFSM.numOfStates() - 1) {
            stateList += ",";
        }
    }

    document.getElementById("info").innerHTML =
    "<b>Your FSM Specs</b><ul>" +
    "<li>Inputs: " + myFSM.getInputs() + "</li>" +
    "<li>Outputs: " + myFSM.getOutputs() + "</li>" +
    "<li>States: " + stateList + "</li>" +
    "<li>Reset State: " + myFSM.getResetState().getName() + "</li>" +
    "<li>Machine Type: " + type + "</li>" +
    "</ul>";
}

function updateCurInput() {
    document.getElementById("curIn").innerHTML = "<b>Current Input:</b> " + fsmIn_UI;
}

function updateCurOutput() {
    var output;

    if (myFSM.isMoore()) {
        output = myFSM.getCurState().getMooreOutput();
    } else {
        output = myFSM.getCurState().getMealyOutput(fsmIn_UI);
    }

    document.getElementById("curOut").innerHTML = "<b>Current Output:</b> " + output;
}

function updateCurState() {
    document.getElementById("curState").innerHTML = "<b>Current State:</b> " + myFSM.getCurState().getName();
}

function updateNextState() {
    var index = myFSM.getCurState().getNextState(fsmIn_UI);
    var nextState;

    if (index == undefined) {
        nextState = "-";
    } else {
        nextState = myFSM.getStateById(index).getName();
    }

    document.getElementById("nextState").innerHTML = "<b>Next State:</b> " + nextState;
}

function createFSM() {
    initFSM();
    setTransition();
    setOutput();

    // for demo only
    displaySpecs();

    // simulation panel
    document.getElementById("simuPanel").style.display = "block";
    updateCurInput();
    updateCurOutput()
    updateCurState();
    updateNextState();
}

function changeInput() {
    updateCurInput();
    updateCurOutput();
    updateNextState();
}

function atClockEdge() {
    myFSM.changeCurState(myFSM.getCurState().getNextState(fsmIn_UI));
    updateCurOutput();
    updateCurState();
    updateNextState();
}

function asyncReset() {
    myFSM.changeCurState(myFSM.getResetStateId());
    enterInput("-");
    updateCurInput();
    updateCurOutput();
    updateCurState();
    updateNextState();
}
