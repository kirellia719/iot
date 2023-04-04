import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

const HistorySpan = ({ connector, feeds = [] }) => {
    const [hover, setHover] = useState(0);
    const [list, setList] = useState([]);

    const onTouch = (index) => {
        setHover(hover => {
            if (hover == index) return null;
            else return index;
        })
    }

    useEffect(() => {
        feeds.map(feed => connector.subscribe(feed));
        connector.on('message', (topic, message) => {
            let feed = topic.split('/')[2];
            setList(list => {
                let time = new Date();
                let year = time.getFullYear();
                let month = (time.getMonth() + 1 < 10 ? '0' : '') + (time.getMonth() + 1);
                let day = (time.getDate() < 10 ? '0' : '') + time.getDate();
                let hour = (time.getHours() < 10 ? '0' : '') + time.getHours();
                let minute = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
                let second = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
                time = `${year}/${month}/${day} ${hour}:${minute}:${second}`
                return [...list, { time, feed, data: message.toString() }];
            })
        });
    }, []);
    return (
        <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}>
            {list.map((item, index) => {
                return (
                    <TouchableWithoutFeedback key={index} onPress={() => onTouch(index)}>
                        <View style={[{ padding: 10, flexDirection: 'row', width: '100%' }, hover == index ? { backgroundColor: '#b1b5ee7d' } : {}]}>
                            <Text style={{ width: '45%', color: 'green' }}>{item.time}</Text>
                            <Text style={{ width: '20%' }}>{item.feed}</Text>
                            <Text style={{ width: '35%', textAlign: 'right', fontWeight: 'bold' }}>{item.data}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            })}
        </ScrollView>
    );
}

const MapStateToProps = (state) => ({ connector: state.connector });
export default connect(MapStateToProps)(HistorySpan);