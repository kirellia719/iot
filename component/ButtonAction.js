import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Switch } from "react-native-web";
import { connect } from "react-redux";

const ButtonAction = ({ label, feedName, maxError = 3, delay = 3000, connector }) => {
    const [hasInit, setHasInit] = useState(false);
    const [state, setState] = useState(true);
    const [wait, setWait] = useState(false);
    const [inter, setInter] = useState(null);
    const [countError, setCountError] = useState(0);

    const initState = () => {
        fetch(`https://io.adafruit.com/api/v2/${connector.username}/feeds/${feedName}/data/last?X-AIO-Key=${connector.key}`)
            .then(res => res.json())
            .then(res => {
                setState(res.value == '1');
                setHasInit(true);
            });
    }

    const doTask = () => {
        console.log('Do Task');
        connector.publish(feedName, !state ? '1' : '0');
    }

    const checkTask = () => {
        setCountError(countError => {
            if (countError > maxError) {
                alert('Không phản hồi')
                stop();
            } else {
                console.log(countError);
                doTask();
                setInter(setTimeout(checkTask, delay));
            }
            return countError + 1;
        })
    }

    const stop = () => {
        setInter(inter => clearTimeout(inter));
        setWait(false);
        setCountError(0);
    }

    useEffect(() => {
        initState();
        connector.subscribe('res');
        connector.on("message", (topic, message) => {
            const feed = topic.split("/")[2];
            if (feed == 'res') {
                let content = message.toString();
                let value = content.split(':')[1];
                let channel = content.split(':')[0];
                if (channel == feedName) {
                    setState(value == '1');
                    stop();
                }
            }
        });
    }, []);

    const toggleSwitch = () => {
        setWait(true);
        setCountError(1);
        checkTask();
    }

    return (

        <View style={{ width: '100%', }}>
            {hasInit ? <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }}>
                <Text>{label}:</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={state ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={state}
                        disabled={wait}
                    />
                    <Text>&nbsp;</Text>
                    <ActivityIndicator style={wait ? {} : { opacity: 0 }} />
                </View>
            </View> : <ActivityIndicator />}
        </View>
    );
}

const MapStateToProps = (state) => ({ connector: state.connector });
export default connect(MapStateToProps)(ButtonAction);