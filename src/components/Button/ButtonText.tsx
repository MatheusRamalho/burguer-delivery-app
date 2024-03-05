import { ReactNode } from 'react'
import { Text } from 'react-native'

interface ButtonTextProps {
    children: ReactNode
}

export function ButtonText({ children }: ButtonTextProps) {
    return (
        <Text className="text-black font-heading text-base mx-2">
            {children}
        </Text>
    )
}
