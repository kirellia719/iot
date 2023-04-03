import { ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const ViewData = ({ label, feedName, connector }) => {
    const [hasInit, setHasInit] = useState(false);
    const [value, setValue] = useState(0);

    const initValue = () => {
        fetch(`https://io.adafruit.com/api/v2/${connector.username}/feeds/${feedName}/data/last?X-AIO-Key=${connector.key}`)
            .then(res => res.json())
            .then(res => {
                setValue(res.value);
                setHasInit(true);
            });
    }
    useEffect(() => {
        connector.subscribe(feedName);
        connector.on('message', (topic, message) => {
            let feed = topic.split('/')[2];
            if (feed == feedName) setValue(message.toString());
        });
        initValue();
    }, []);

    return (<>
        {hasInit ? <Text> {label}: {value}</Text > : <ActivityIndicator />}
    </>);
};

const MapStateToProps = (state) => ({ connector: state.connector });
export default connect(MapStateToProps)(ViewData);