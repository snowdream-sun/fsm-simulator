function initFSM() {
    FSM._inputs = USER_INPUT.inputs.slice();
    FSM._outputs = USER_INPUT.outputs.slice();
    FSM._states = USER_INPUT.states.slice(); // array of state names
    FSM._stateObj = {};
    // collection of state objects with state names being the keys
    FSM._states.forEach(function(state) {
        FSM._stateObj[state] = new State(state);
    });
    FSM._resetState = FSM._stateObj[USER_INPUT.resetState];
    FSM._curState = FSM._resetState;
}
