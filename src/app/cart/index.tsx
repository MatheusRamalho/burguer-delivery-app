import { Feather } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { LinkButton } from '@/components/LinkButton'
import { Product } from '@/components/Product'
import { PHONE_NUMBER } from '@/constants'
import { useCartStore } from '@/stores/cart-store'
import { ProductCart } from '@/types/ProductCart'
import { formatCurrency } from '@/utils/format-currency'

export default function Cart() {
    const { products, remove, clear } = useCartStore()
    const [address, setAddress] = useState<string>('')
    const navigation = useNavigation()

    const total = formatCurrency(
        products.reduce(
            (total, product) => total + product.price * product.quantity,
            0,
        ),
    )

    function handleProductCartRemove(product: ProductCart) {
        Alert.alert(
            'Remover',
            `Deseja remover ${product.title} do carrinhho?`,
            [
                {
                    text: 'Cancelar',
                },
                {
                    text: 'Remover',
                    onPress: () => remove(product.id),
                },
            ],
        )
    }

    function handleOrder() {
        if (address.trim().length === 0) {
            return Alert.alert('Pedido', 'Informe os dados da entrega')
        }

        const orderProducts = products
            .map((product) => `\n ${product.quantity} ${product.title}`)
            .join('')

        const orderMessage = `🍔 NOVO PEDIDO
            \n ----------------------------
            \n Entregar em: ${address}
            \n ${orderProducts}
            \n Valor total: ${total}
        `

        Linking.openURL(
            `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${orderMessage}`,
        )

        setAddress('')
        clear()
        navigation.goBack()
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />

            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-5 flex-1">
                        {products.length > 0 ? (
                            <View className="border-b border-b-slate-700">
                                {products.map((product) => (
                                    <Product
                                        key={product.id}
                                        data={product}
                                        onPress={() =>
                                            handleProductCartRemove(product)
                                        }
                                    />
                                ))}
                            </View>
                        ) : (
                            <Text className="font-body text-slate-400 text-center my-8">
                                Seu carrino está vazio.
                            </Text>
                        )}

                        <View className="flex-row gap-2 items-center my-5">
                            <Text className="font-subtitle text-xl text-white">
                                Total:
                            </Text>

                            <Text className="font-heading text-2xl text-lime-400">
                                {total}
                            </Text>
                        </View>

                        <Input
                            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                            onChangeText={setAddress}
                            blurOnSubmit // impede do enter do teclado ser para adicionar mais uma linha
                            onSubmitEditing={handleOrder} // add função do teclado fazer submit
                            returnKeyType="next" // muda o icone de enter do teclado
                        />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button.Root onPress={handleOrder}>
                    <Button.Text> Enviar pedido </Button.Text>

                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button.Root>

                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}
