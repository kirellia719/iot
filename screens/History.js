import { ScrollView, View } from 'react-native';
import HistoryChart from '../component/HistoryChart';

const History = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            <ScrollView style={{ flex: 1, width: '100%' }}>
                <HistoryChart feedName={'cambien1'} label='Nhiệt độ' duration={10000} color={'Crimson'} />
                <HistoryChart feedName={'cambien2'} label='Độ ẩm' duration={10000} color={'DodgerBlue'} />
            </ScrollView>
        </View>
    );
}

export default History;