import { ActivityIndicator, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const ViewHuman = ({ label, feedName, color, connector }) => {
    const [hasInit, setHasInit] = useState(false);
    const [value, setValue] = useState(0);

    const initValue = () => {
        fetch(`https://io.adafruit.com/api/v2/${connector.username}/feeds/${feedName}/data/last?X-AIO-Key=${connector.key}`)
            .then(res => res.json())
            .then(res => {
                setValue(res.value);
                setHasInit(true);
            })
            .catch(() => {
                setValue(0);
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
        {hasInit ? (<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', backgroundColor: color }}>
            <View style={{ flexDirection: 'row', height: '100%', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                <Icon name='person-outline' size={50} color={'green'} />
                <View style={{ width: 100, alignItems: 'center' }}><Text style={{ fontWeight: 500 }}>{label}</Text></View >
            </View>
            <View><Text style={{ fontSize: 15, padding: 20 }}>{value == '1' ? 'Có người' : 'Không có người'}</Text></View>
        </View >) : <ActivityIndicator />
        }
    </>);
};

const MapStateToProps = (state) => ({ connector: state.connector });
export default connect(MapStateToProps)(ViewHuman);