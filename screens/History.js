import { View } from 'react-native';
import HistorySpan from '../component/HistorySpan';

const History = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10 }}>
            <HistorySpan feeds={['cambien1', 'cambien2', 'nutnhan1', 'ai']} />
        </View>
    );
}

export default History;