import { ActivityIndicator, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';

const RecognitionButton = ({ connector, recognition }) => {
    const [content, setContent] = useState('');
    const [wait, setWait] = useState(false);

    useEffect(() => {
        recognition.recognition.onresult = (event) => {
            var lastResult = event.results.length - 1;
            let text = (event.results[lastResult][0].transcript).toLocaleLowerCase();
            setContent(text);
            setWait(false);
            if (text == 'bật máy bơm') {
                connector.publish('nutnhan1', '1');
            }
            else if (text == 'tắt máy bơm') connector.publish('nutnhan1', '0');
        }

        recognition.recognition.onspeechend = () => recognition.recognition.stop();

        recognition.recognition.onerror = (event) => {
            console.log('Eror');
            setWait(false);
            setContent('Error occurred in recognition: ' + event.error);
        }
    }, [])
    const start = () => {
        setWait(true);
        recognition.recognition.start();
    }
    return (
        <View style={{ width: '100%', }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 20, alignItems: 'center' }}>
                    <Button title={'Nhấn để nói'} onPress={start} />
                </View>
                <View style={{ flexDirection: 'row', height: '100%', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                    <Text>{content}</Text>
                </View>

            </View>
        </View>
    );
};

const MapStateToProps = (state) => ({ connector: state.connector, recognition: state.recognition });
export default connect(MapStateToProps)(RecognitionButton);