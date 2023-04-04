import { View } from 'react-native';
import mqttClient from '../mqtt/MQTTClientWeb';
import ButtonAction from '../component/ButtonAction';
import ViewDataTemp from '../component/ViewDataTemp';
import ViewDataHumid from '../component/ViewDataHumid';
import { Divider } from 'react-native-elements';
import ViewHuman from '../component/ViewHuman';

const Home = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', margin: 10, backgroundColor: '#fff' }}>
            <View style={{ width: '100%', height: '100%' }}>
                <View style={[center, { flex: 1 }]}>
                    <ViewDataTemp label={'Nhiệt độ'} feedName={'cambien1'} color={'#fbe3e3'} />
                </View>
                <Divider />

                <View style={[center, { flex: 1 }]}>
                    <ViewDataHumid
                        label={'Độ ẩm'}
                        feedName='cambien2'
                        color={'#c6e2f1'}
                    />
                </View>
                <Divider />
                <View style={[center, { flex: 1 }]}>
                    <ViewHuman
                        label={'Người'}
                        feedName='ai'
                        color={'#a3ffa6b3'}
                    />
                </View>
                <Divider />

                <View style={[center, { flex: 1 }]}>
                    <ButtonAction label={'Máy bơm'} feedName={'nutnhan1'} connector={mqttClient} maxError={2} delay={3000} />
                </View>

            </View>
        </View>
    );
};

const center = {
    alignItems: 'center', justifyContent: 'center'
}

export default Home;