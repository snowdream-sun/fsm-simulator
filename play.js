function setFSMTransition() {
    USER_INPUT.transitionT.forEach(function(row) {
        var cur = row[0];
        var input = row[1];
        var next = row[2];
        FSM._stateObj[cur]._transition[input] = next;
    });
}
