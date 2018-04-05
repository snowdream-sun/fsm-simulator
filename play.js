EG_MOORE_2.inputs = ["A"];
EG_MOORE_2.outputs = ["Y"];
EG_MOORE_2.states = ["S0", "S1", "S2"];
EG_MOORE_2.resetState = "S0";
EG_MOORE_2.transitionT = [
    [  "S0",     "0",     "S1"  ],
    [  "S0",     "1",     "S0"  ],
    [  "S1",     "0",     "S1"  ],
    [  "S1",     "1",     "S2"  ],
    [  "S2",     "0",     "S1"  ],
    [  "S2",     "1",     "S0"  ]
];
EG_MOORE_2.type = "Moore";
EG_MOORE_2.outputT = [
    [  "S0",     "0"  ],
    [  "S1",     "0"  ],
    [  "S2",     "1"  ]
];
