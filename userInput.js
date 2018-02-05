"use strict";

/*** Section I - Inputs, Outputs, States and Reset State ***/

// data type: string array // 1-bit signal
var inputs_UI = ["TA", "TB"];

// data type: string array // 1-bit signal
var outputs_UI = ["LA1", "LA0", "LB1", "LB0"];

// data type: string array // max: 5 states
var states_UI = ["S0", "S1", "S2", "S3"];

// data type: integer // use state index instead of name
var resetState_UI = 0;

/*** Section II - State Transition Table ***/

// data type: 2D array // use state index instead of name
var transitionT_UI = [
//  [curState, inputs, nextState]
//  [ integer, string,  integer ]
    [    0,     "0X",       1   ],
    [    0,     "1X",       0   ],
    [    1,     "XX",       2   ],
    [    2,     "X0",       3   ],
    [    2,     "X1",       2   ],
    [    3,     "XX",       0   ]
];

/*** Section III - Output Table ***/

// data type: boolean // indicate machine type: Moore or Mealy
var isMoore_UI = true;

// data type: 2D array // use state index instead of name
// for Moore machine
var outputT_UI = [
//  [curState, outputs]
//  [ integer, string ]
    [    0,    "0010" ],
    [    1,    "0110" ],
    [    2,    "1000" ],
    [    3,    "1001" ]
];

/*
// data type: 2D array // use state index instead of name
// for Mealy machine
var outputT_UI = [
//  [curState, inputs,   outputs]
//  [ integer, string,   string ]
    [    0,     "XX",    "0010" ],
    [    1,     "XX",    "0110" ],
    [    2,     "XX",    "1000" ],
    [    3,     "XX",    "1001" ]
];
*/

/*** Section IV - Simulation ***/

// data type: string // string length = number of inputs
var fsmIn_UI = "-";

function enterInput(input) {
    fsmIn_UI = input;
    changeInput();
}
