import { useTimeTrack } from '@/src/timetrack/hooks/useTimeTrack';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


export default function HomeScreen() {

  const safeArea = useSafeAreaInsets()

  const { addTimetrack } = useTimeTrack()

  const [form, setForm] = useState({
    dni: '',
    password: ''
  })


  const onSubmit = () => {
    addTimetrack.mutate({
      dni: form.dni,
      password: form.password
    })
  }


  return (
    <SafeAreaView>

      <View className="w-full max-w-md self-center">


        <View className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">

          <Text className="text-xl font-semibold text-neutral-900 mb-6">
            Accede a tu jornada
          </Text>

          <View className="mb-5">
            <Text className="text-sm font-medium text-neutral-700">
              DNI
            </Text>
            <TextInput
              placeholder="Introduce tu DNI"
              placeholderTextColor="#9ca3af"
              className="mt-2 border border-neutral-300 rounded-lg px-4 py-3 text-base bg-neutral-50"
              onChangeText={(text) => setForm({ ...form, dni: text })}
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-neutral-700">
              Contraseña
            </Text>
            <TextInput
              placeholder="Introduce tu contraseña"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              className="mt-2 border border-neutral-300 rounded-lg px-4 py-3 text-base bg-neutral-50"
              onChangeText={(text) => setForm({ ...form, password: text })}
            />
          </View>

          <Pressable
            className="bg-indigo-600 rounded-xl py-4 items-center active:opacity-80"
            onPress={onSubmit}
            disabled={addTimetrack.isPending}
          >
            <Text className="text-white font-semibold text-base">
              {addTimetrack.isPending ? "Fichando..." : "Iniciar sesión"}
            </Text>
          </Pressable>

        </View>
      </View>
    </SafeAreaView>

  );
}


