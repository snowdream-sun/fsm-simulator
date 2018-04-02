"use strict";

// Global Variable
var FSM = {};

// State Constructor
function State(name) {
    this._name = name;
    this._encoding = "";
    this._transition = {}; // state transition table
    this._outputs = {}; // output table
}

// Functions
function initFSM() {
    FSM._inputs = USER_INPUT.inputs;
    FSM._outputs = USER_INPUT.outputs;
    FSM._states = USER_INPUT.states; // array of state names
    FSM._stateObj = {}; // collection of state objects with state names being the keys

    for (var i = 0; i < FSM._states.length; i++) {
        FSM._stateObj[FSM._states[i]] = new State(FSM._states[i]);
    }

    FSM._resetState = FSM._stateObj[USER_INPUT.resetState];
    FSM._curState = FSM._resetState;
}

function setFSMTransition() {
    for (var i = 0; i < USER_INPUT.transitionT.length; i++) {
        var cur = USER_INPUT.transitionT[i][0];
        var input = USER_INPUT.transitionT[i][1];
        var next = USER_INPUT.transitionT[i][2];

        FSM._stateObj[cur]._transition[input] = next;
    }
}

function setFSMOutput() {
    FSM._type = USER_INPUT.type;

    if (FSM._type == "moore") {
        for (var i = 0; i < USER_INPUT.outputT.length; i++) {
            var cur = USER_INPUT.outputT[i][0];
            var out = USER_INPUT.outputT[i][1];

            FSM._stateObj[cur]._outputs = out;
        }
    } else {
        for (var i = 0; i < USER_INPUT.outputT.length; i++) {
            var cur = USER_INPUT.outputT[i][0];
            var input = USER_INPUT.outputT[i][1];
            var out = USER_INPUT.outputT[i][2];

            FSM._stateObj[cur]._outputs[input] = out;
        }
    }
}

function createFSM() {
    initFSM();
    setFSMTransition();
    setFSMOutput();
}

function getResetState() {
    return FSM._resetState._name;
}

function getCurState() {
    return FSM._curState._name;
}

function readTable(table, curIn) {
    for (var input in table) {
        var pattern = new RegExp(input.replace(/X/g, "[01]"));
        if (pattern.test(curIn)) {
            return table[input];
        }
    }
    // assume ALL input combinations are covered
    // the function will always return before exiting the for loop
}

function getCurOut(curIn) {
    if (FSM._type == "moore") {
        return FSM._curState._outputs;
    } else {
        if (curIn == "undefined") {
            return "undefined";
        } else {
            return readTable(FSM._curState._outputs, curIn);
        }
    }
}

function getNextState(curIn) {
    if (curIn == "undefined") {
        return "undefined";
    } else {
        return readTable(FSM._curState._transition, curIn);
    }
}

function updateCurState(nextState) {
    FSM._curState = FSM._stateObj[nextState];
}

function stateEncoding(n) {
    for (var i = 0; i < FSM._states.length; i++) {
        var binary = "";
        var q = i;

        // convert decimal to binary
        while (q != 0) {
            binary = q % 2 + binary;
            q = Math.floor(q / 2);
        }
        FSM._stateObj[FSM._states[i]]._encoding = n + "'b" + binary.padStart(n, "0");
    }
}

function getCondition(input, condition) {
    for (var i = 0; i < input.length; i++) {
        if (input.charAt(i) != "X") {
            condition.push(FSM._inputs[i] + " == 1'b" + input.charAt(i));
        }
    }
}

function assignOut(out, assignment) {
    for (var i = 0; i < out.length; i++) {
        assignment.push(FSM._outputs[i] + " = 1'b" + out.charAt(i) + ";\n");
    }
}

function writeTransitionConidition(state, block) {
    for (var input in FSM._stateObj[state]._transition) {
        var transition = "next_state = " + FSM._stateObj[state]._transition[input] + ";\n";
        var condition = [];
        getCondition(input, condition);

        if (condition.length == 0) { // all inputs are "X"
            block.push(transition);
        } else {
            block.push("if (" + condition.join(" && ") + ")\n");
            block.push("\t" + transition);
        }
    }
}

function writeOutputConidition(state, block) {
    for (var input in FSM._stateObj[state]._outputs) {
        var assignment = [];
        var condition = [];
        assignOut(FSM._stateObj[state]._outputs[input], assignment);
        getCondition(input, condition);

        if (condition.length == 0) { // all inputs are "X"
            for (var i = 0; i < assignment.length; i++) {
                block.push(assignment[i]);
            }
        } else {
            block.push("if (" + condition.join(" && ") + ")\n");
            if (assignment.length > 1) {
                block.push("begin\n");
            }
            for (var i = 0; i < assignment.length; i++) {
                block.push("\t" + assignment[i]);
            }
            if (assignment.length > 1) {
                block.push("end\n");
            }
        }
    }
}

function writeVerilog() {
    // module inputs and outputs
    var code =
        "module fsm(\n" +
        "\tinput clk, reset,\n" +
        "\tinput " + FSM._inputs.join(", ") + ",\n" +
        "\toutput reg " + FSM._outputs.join(", ") + "\n" +
        ");\n";
    code += "\n";

    // registers
    // default: binary encoding
    // var nBit = Math.ceil(Math.log2(FSM._states.length)); // not compatible with IE
    var nBit = Math.ceil(Math.log(FSM._states.length) / Math.log(2)); // number of bits depends on number of states
    var msb = nBit - 1;
    if (msb == 0) {
        code += "reg state, next_state;\n";
    } else {
        code += "reg [" + msb + ":0] state, next_state;\n";
    }
    code += "\n";

    // parameters
    stateEncoding(nBit);
    code += "parameter ";
    for (var i = 0; i < FSM._states.length; i++) {
        code += FSM._states[i] + " = " + FSM._stateObj[FSM._states[i]]._encoding;
        if (i < FSM._states.length - 1) {
            code += ", ";
        } else {
            code += ";\n";
        }
    }
    code += "\n";

    // combinational block (state transition)
    code +=
        "always @(*)\n" +
        "begin\n" +
        "\tif (reset)\n" + // asynchronous reset
        "\t\tstate = " + FSM._resetState._name + ";\n" +
        "\tcase(state)\n";
    for (var i = 0; i < FSM._states.length; i++) {
        // case name (state name)
        code += "\t" + FSM._states[i] + ":\n";

        // code block
        var block = [];
        writeTransitionConidition(FSM._states[i], block);
        for (var j = 0; j < block.length; j++) {
            code += "\t\t" + block[j];
        }
    }
    code +=
        "\tendcase\n" +
        "end\n";
    code += "\n";

    // sequential block
    // default: active rising edge
    code +=
        "always @(posedge clk)\n" +
        "begin\n" +
        "\tstate <= next_state;\n" +
        "end\n";
    code += "\n";

    // combinational block (output)
    code +=
        "always @(*)\n" +
        "begin\n" +
        "\tcase(state)\n";
    for (var i = 0; i < FSM._states.length; i++) {
        // case name (state name)
        code += "\t" + FSM._states[i] + ":\n";

        // code block
        if (FSM._type == "moore") {
            var assignment = [];
            assignOut(FSM._stateObj[FSM._states[i]]._outputs, assignment);
            for (var j = 0; j < assignment.length; j++) {
                code += "\t\t" + assignment[j];
            }
        } else {
            var block = [];
            writeOutputConidition(FSM._states[i], block);
            for (var j = 0; j < block.length; j++) {
                code += "\t\t" + block[j];
            }
        }
    }
    code +=
        "\tendcase\n" +
        "end\n";
    code += "\n";

    code += "endmodule";
    return code;
}
