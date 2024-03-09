/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                heading: 'Inter_600SemiBold',
                subtitle: 'Inter_500Medium',
                body: 'Inter_400Regular',
                bold: 'Inter_700Bold',
            },
        },
    },
    plugins: [],
}
