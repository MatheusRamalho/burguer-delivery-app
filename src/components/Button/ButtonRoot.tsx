import { ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonRootProps extends TouchableOpacityProps {
    children: ReactNode
}

export function ButtonRoot({ children, ...rest }: ButtonRootProps) {
    return (
        <TouchableOpacity
            className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
            activeOpacity={0.7}
            {...rest}
        >
            {children}
        </TouchableOpacity>
    )
}
