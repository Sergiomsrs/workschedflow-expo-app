import React from 'react'
import { ImageBackground, Text, View } from 'react-native'

const HeaderLayout = () => {
    return (
        <ImageBackground
            source={require("../../../assets/images/bg-image-loginForm.webp")}
            resizeMode="cover"
            className="w-full h-48 justify-center"
        >
            <View className="absolute inset-0 bg-gradient-to-b from-blue-900/90 to-blue-800/80" />

            <View className="items-center px-4">
                <Text className="text-white text-xl font-bold">
                    WORK<Text className="text-blue-300">SCHEDFLOW</Text>
                </Text>

                <Text className="text-blue-100 text-xs">
                    Mi Jornada Laboral
                </Text>
            </View>
        </ImageBackground>
    )
}

export default HeaderLayout