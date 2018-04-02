"use strict";

// Mealy

// Global Variable
var USER_INPUT = {};

/* ---------- Section I - Inputs, Outputs, States and Reset State ---------- */

// data type: string array
USER_INPUT.inputs = ["A"];

// data type: string array
USER_INPUT.outputs = ["Y"];

// data type: string array
USER_INPUT.states = ["S0", "S1"];

// data type: string
USER_INPUT.resetState = "S0";

/* ---------- Section II - State Transition Table ---------- */

// data type: 2D string array
USER_INPUT.transitionT = [
//  [curState, inputs, nextState]
    [  "S0",     "0",     "S1"  ],
    [  "S0",     "1",     "S0"  ],
    [  "S1",     "0",     "S1"  ],
    [  "S1",     "1",     "S0"  ]
];

/* ---------- Section III - Machine Type and Output Table ---------- */

// data type: string
USER_INPUT.type = "mealy"; // either "moore" or "mealy"

// data type: 2D string array
USER_INPUT.outputT = [
//  [curState, inputs, outputs] for mealy machine
    [  "S0",     "0",    "0"  ],
    [  "S0",     "1",    "0"  ],
    [  "S1",     "0",    "0"  ],
    [  "S1",     "1",    "1"  ]
];
