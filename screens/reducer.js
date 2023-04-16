import MQTTClientWeb from "../mqtt/MQTTClientWeb";
import Recognition from "../mqtt/Recognition";

const initState = {
    connector: MQTTClientWeb,
    recognition: Recognition
}

const Reducer = (state = initState, action) => {
    return state;
}

// Action

export default Reducer;