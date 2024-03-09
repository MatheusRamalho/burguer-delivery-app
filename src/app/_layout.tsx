/* eslint-disable camelcase */
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native'

import '@/styles/global.css'

import { Loading } from '@/components/Loading'

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
    })

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-900 pt-10">
            <Slot />
        </SafeAreaView>
    )
}
