import { ScrollView, View } from 'react-native';
import LineChart from '../component/LineChart';

const Statistic = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <LineChart feedName={'cambien1'} label='Nhiệt độ' duration={10000} color={'Crimson'} />
                <LineChart feedName={'cambien2'} label='Độ ẩm' duration={10000} color={'DodgerBlue'} />
            </ScrollView>
        </View>
    );
}

export default Statistic;