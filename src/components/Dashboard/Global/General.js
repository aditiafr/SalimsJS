export const toRupiah = (amount) => {
    return Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(amount)
}

export const toRupiahNo = (amount) => {
    return Intl.NumberFormat("id-ID", {
        style: "decimal",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount)
}