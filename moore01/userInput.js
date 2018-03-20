"use strict";

// Moore #01

// Global Variable
var userInput = {};

/*** Section I - Inputs, Outputs, States and Reset State ***/

// data type: string array
userInput.inputs = ["TA", "TB"];

// data type: string array
userInput.outputs = ["LA1", "LA0", "LB1", "LB0"];

// data type: string array
userInput.states = ["S0", "S1", "S2", "S3"];

// data type: string
userInput.resetState = "S0";

/*** Section II - State Transition Table ***/

// data type: 2D string array
userInput.transitionT = [
//  [curState, inputs, nextState]
    [  "S0",    "0X",     "S1"  ],
    [  "S0",    "1X",     "S0"  ],
    [  "S1",    "XX",     "S2"  ],
    [  "S2",    "X0",     "S3"  ],
    [  "S2",    "X1",     "S2"  ],
    [  "S3",    "XX",     "S0"  ]
];

/*** Section III - Output Table ***/

// data type: string
userInput.type = "moore"; // either "moore" or "mealy"

// data type: 2D string array
userInput.outputT = [
//  [curState, outputs] for moore machine
    [  "S0",   "0010" ],
    [  "S1",   "0110" ],
    [  "S2",   "1000" ],
    [  "S3",   "1001" ]
];

/*
// data type: 2D string array
userInput.outputT = [
//  [curState, inputs, outputs] for mealy machine
    [  "S0,     "XX",  "0010" ],
    [  "S1,     "XX",  "0110" ],
    [  "S2,     "XX",  "1000" ],
    [  "S3,     "XX",  "1001" ]
];
*/

/*** Section IV - Simulation ***/

// TBD
