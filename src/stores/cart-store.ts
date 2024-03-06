import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import * as cartInMemory from './helpers/cart-in-memory'

import { ProductType } from '@/types/Product'
import { ProductCart } from '@/types/ProductCart'

interface CartStoreProps {
    products: ProductCart[]
    add: (product: ProductType) => void
    remove: (productId: string) => void
    clear: () => void
}

export const useCartStore = create(
    persist<CartStoreProps>(
        (set) => ({
            products: [],

            add: (product: ProductType) =>
                // set: metodo do Zustand para atualizar o estado (products)...
                // state: recuperando o estado...
                set((state) => ({
                    products: cartInMemory.add(state.products, product),
                })),

            remove: (productId: string) =>
                set((state) => ({
                    products: cartInMemory.remove(state.products, productId),
                })),

            clear: () => set(() => ({ products: [] })),
        }),

        {
            name: 'BURGUER-DELIVERY-APP:CART',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)
