import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams, Redirect, useNavigation } from 'expo-router'
import { Image, Text, View } from 'react-native'

import { Button } from '@/components/Button'
import { LinkButton } from '@/components/LinkButton'
import { PRODUCTS } from '@/data/products'
import { useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/format-currency'

export default function Product() {
    const { id } = useLocalSearchParams()
    const navigation = useNavigation()
    const { add } = useCartStore()

    const product = PRODUCTS.find((item) => item.id === id)

    function handleAddToCart() {
        if (product) {
            add(product)
            navigation.goBack()
        }
    }

    if (!product) {
        return <Redirect href="/" />
    }

    return (
        <View className="flex-1">
            <Image source={product.cover} className="w-full h-52" resizeMode="cover" alt="" />

            <View className="p-5 mt-8 flex-1">
                <Text className="text-white text-xl font-heading">{product.title}</Text>

                <Text className="text-lime-400 text-2xl font-heading my-2">{formatCurrency(product.price)}</Text>

                <Text className="text-slate-400 font-body text-base leading-6 mb-6">{product.description}</Text>

                {product.ingredients.map((ingredient) => (
                    <Text className="text-slate-400 font-body text-base leading-6" key={ingredient}>
                        {'\u2022'} {ingredient}
                    </Text>
                ))}
            </View>

            <View className="p-5 pb-8 gap-5">
                <Button.Root onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20} />
                    </Button.Icon>

                    <Button.Text> Adicionar ao pedido </Button.Text>
                </Button.Root>

                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}
