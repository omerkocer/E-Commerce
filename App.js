import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Drawer from './screens/Drawer';
import { useRef } from 'react';
export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    var drawerCntx = useRef();
    if (!isLoadingComplete) {
        return null;
    }
    else {
        return (<SafeAreaProvider>
        <Drawer ref={drawerCntx}>
          <Navigation colorScheme={colorScheme} drawerCntx={drawerCntx}/>
          <StatusBar />
        </Drawer>
      </SafeAreaProvider>);
    }
}
