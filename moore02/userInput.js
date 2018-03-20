"use strict";

// Moore #02

// Global Variable
var userInput = {};

/*** Section I - Inputs, Outputs, States and Reset State ***/

// data type: string array
userInput.inputs = ["A"];

// data type: string array
userInput.outputs = ["Y"];

// data type: string array
userInput.states = ["S0", "S1", "S2"];

// data type: string
userInput.resetState = "S0";

/*** Section II - State Transition Table ***/

// data type: 2D string array
userInput.transitionT = [
//  [curState, inputs, nextState]
    [  "S0",     "0",     "S1"  ],
    [  "S0",     "1",     "S0"  ],
    [  "S1",     "0",     "S1"  ],
    [  "S1",     "1",     "S2"  ],
    [  "S2",     "0",     "S1"  ],
    [  "S2",     "1",     "S0"  ]
];

/*** Section III - Output Table ***/

// data type: string
userInput.type = "moore"; // either "moore" or "mealy"

// data type: 2D string array
userInput.outputT = [
//  [curState, outputs] for moore machine
    [  "S0",     "0"  ],
    [  "S1",     "0"  ],
    [  "S2",     "1"  ]
];

/*** Section IV - Simulation ***/

// TBD
