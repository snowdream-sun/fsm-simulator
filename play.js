function setFSMOutput() {
    FSM._type = USER_INPUT.type;
    if (FSM._type == "Moore") {
        USER_INPUT.outputT.forEach(function(row) {
            var cur = row[0];
            var out = row[1];
            FSM._stateObj[cur]._outputs = out;
        });
    } else {
        USER_INPUT.outputT.forEach(function(row) {
            var cur = row[0];
            var input = row[1];
            var out = row[2];
            FSM._stateObj[cur]._outputs[input] = out;
        });
    }
}
