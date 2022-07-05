// With undefined as the paramter it will auto determine how to format the number basedon where you live
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "CAD", style: "currency"
})

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}