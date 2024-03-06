import { Link } from 'expo-router'
import { useState, useRef } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

import { CategoryButton } from '@/components/CategoryButton'
import { Header } from '@/components/Header'
import { Product } from '@/components/Product'
import { CATEGORIES, MENU } from '@/data/products'
import { useCartStore } from '@/stores/cart-store'
import { ProductType } from '@/types/Product'

export default function Home() {
    const [category, setCategory] = useState(CATEGORIES[0])
    const sectionListRef = useRef<SectionList<ProductType>>(null)
    const { products } = useCartStore()

    const cartQuantityItems = products.reduce(
        (total, product) => total + product.quantity,
        0,
    )

    function handleCategorySelect(selectedCategory: string) {
        setCategory(selectedCategory)

        const sectionIndex = CATEGORIES.findIndex(
            (category) => category === selectedCategory,
        )

        if (sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0,
            })
        }
    }

    return (
        <View className="flex-1 pt-8">
            <Header
                title="Faça seu pedido"
                cartQuantityItems={cartQuantityItems}
            />

            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <CategoryButton
                        title={item}
                        isSelected={item === category}
                        onPress={() => handleCategorySelect(item)}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="max-w-10 mt-5"
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />

            <SectionList
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}
                renderItem={({ item }) => (
                    <Link href={`/product/${item.id}`} asChild>
                        <Product data={item} />
                    </Link>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text className="text-xl text-white font-heading mt-8 mb-3">
                        {title}
                    </Text>
                )}
                className="flex-1 p-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    )
}
