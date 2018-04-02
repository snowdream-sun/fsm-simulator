"use strict";

// Example: Moore #1

// Global Variable
var USER_INPUT = {};

/* ---------- Section I - Inputs, Outputs, States and Reset State ---------- */

// data type: string array
USER_INPUT.inputs = ["TA", "TB"];

// data type: string array
USER_INPUT.outputs = ["LA1", "LA0", "LB1", "LB0"];

// data type: string array
USER_INPUT.states = ["S0", "S1", "S2", "S3"];

// data type: string
USER_INPUT.resetState = "S0";

/* ---------- Section II - State Transition Table ---------- */

// data type: 2D string array
USER_INPUT.transitionT = [
//  [curState, inputs, nextState]
    [  "S0",    "0X",     "S1"  ],
    [  "S0",    "1X",     "S0"  ],
    [  "S1",    "XX",     "S2"  ],
    [  "S2",    "X0",     "S3"  ],
    [  "S2",    "X1",     "S2"  ],
    [  "S3",    "XX",     "S0"  ]
];

/* ---------- Section III - Machine Type and Output Table ---------- */

// data type: string
USER_INPUT.type = "moore"; // either "moore" or "mealy"

// data type: 2D string array
USER_INPUT.outputT = [
//  [curState, outputs] for moore machine
    [  "S0",   "0010" ],
    [  "S1",   "0110" ],
    [  "S2",   "1000" ],
    [  "S3",   "1001" ]
];
