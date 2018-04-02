"use strict";

// Moore #2

// Global Variable
var USER_INPUT = {};

/* ---------- Section I - Inputs, Outputs, States and Reset State ---------- */

// data type: string array
USER_INPUT.inputs = ["A"];

// data type: string array
USER_INPUT.outputs = ["Y"];

// data type: string array
USER_INPUT.states = ["S0", "S1", "S2"];

// data type: string
USER_INPUT.resetState = "S0";

/* ---------- Section II - State Transition Table ---------- */

// data type: 2D string array
USER_INPUT.transitionT = [
//  [curState, inputs, nextState]
    [  "S0",     "0",     "S1"  ],
    [  "S0",     "1",     "S0"  ],
    [  "S1",     "0",     "S1"  ],
    [  "S1",     "1",     "S2"  ],
    [  "S2",     "0",     "S1"  ],
    [  "S2",     "1",     "S0"  ]
];

/* ---------- Section III - Machine Type and Output Table ---------- */

// data type: string
USER_INPUT.type = "moore"; // either "moore" or "mealy"

// data type: 2D string array
USER_INPUT.outputT = [
//  [curState, outputs] for moore machine
    [  "S0",     "0"  ],
    [  "S1",     "0"  ],
    [  "S2",     "1"  ]
];
