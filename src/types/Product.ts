import { ImageProps } from 'react-native'

export interface ProductType {
    id: string
    title: string
    price: number
    description: string
    cover: ImageProps
    thumbnail: ImageProps
    ingredients: string[]
}
