import { create } from 'zustand'

import * as cartInMemory from './helpers/cart-in-memory'

import { ProductType } from '@/types/Product'
import { ProductCart } from '@/types/ProductCart'

interface CartStoreProps {
    products: ProductCart[]
    add: (product: ProductType) => void
}

export const useCartStore = create<CartStoreProps>((set) => ({
    products: [],

    add: (product: ProductType) =>
        // set: metodo do Zustand para atualizar o estado (products)...
        // state: recuperando o estado...
        set((state) => ({
            products: cartInMemory.add(state.products, product),
        })),
}))
