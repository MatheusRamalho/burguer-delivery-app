import { ProductType } from '@/types/Product'
import { ProductCart } from '@/types/ProductCart'

export function add(products: ProductCart[], newProduct: ProductType) {
    const existingProduct = products.find(({ id }) => newProduct.id === id) // Verifica se já existe o produto...

    if (existingProduct) {
        return products.map(
            (product) =>
                product.id === existingProduct.id
                    ? { ...product, quantity: product.quantity + 1 } // Se já existe, só aumenta a quantidade...
                    : product, //  Se não existe, adiciona o producto...
        ) // Vertificando se o novo produto é igual ao que já existe...
    }

    return [...products, { ...newProduct, quantity: 1 }]
}
