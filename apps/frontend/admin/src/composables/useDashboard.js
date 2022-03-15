import { reactive, computed, readonly } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import { GetSales } from 'graphql-client/admin/orders'

// return sales per day for the range of dates
// :param startDate: Date object representing the start of the range of dates , if empty default satrt of current month
// :param endDate: Date object representing the end of the range of dates , if empty default end of current month
export const useSalesForMonth = (firstDay, endDate) => {
  if (!firstDay) {
    const today = new Date()
    firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  }
  if (!endDate) {
    const today = new Date()
    endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  }

  const { result, loading, error } = useQuery(GetSales, {
    createdAt_Gte: firstDay.toISOString(),
    createdAt_Lte: endDate.toISOString(),
  })

  const ordersThisMonth = useResult(result, [], data => data.orders.edges)

  const salesPerDay = computed(() => {
    const sales = []
    const days = []

    if (ordersThisMonth.value) {
      ordersThisMonth.value.forEach(({ node }) => {
        const date = new Date(node.createdAt)
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()

        const dayIndex = days.findIndex(d => d.day === day && d.month === month && d.year === year)
        if (dayIndex === -1) {
          days.push({ day, month, year })
          sales.push({ day, month, year, sales: 1 })
        } else {
          sales[dayIndex].sales++
        }
      })
    }
    return sales
  })

  const earningsPerDay = computed(() => {
    const earnings = []
    const days = []

    if (ordersThisMonth.value) {
      ordersThisMonth.value.forEach(({ node }) => {
        const date = new Date(node.createdAt)
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()

        const dayIndex = days.findIndex(d => d.day === day && d.month === month && d.year === year)
        if (dayIndex === -1) {
          days.push({ day, month, year })
          earnings.push({ day, month, year, earnings: node.totalAmount })
        } else {
          earnings[dayIndex].earnings += node.totalAmount
        }
      })
    }
    return earnings
  })

  return {
    salesPerDay,
    earningsPerDay,
    loading,
    error,
    ordersThisMonth,
  }
}

// return the sales for the months for startDate and endDate
// :param startDate: Date object representing the start of the range of dates
// :param endDate: Date object representing the end of the range of dates
export const useSalesForMonths = (startDate, endDate) => {
  const { result, loading, error } = useQuery(GetSales, {
    createdAt_Gte: startDate.toISOString(),
    createdAt_Lte: endDate.toISOString(),
  })

  const ordersTheseMonths = useResult(result, [], data => data.orders.edges)

  const salesMonthRange = computed(() => {
    const sales = []
    const months = []

    if (ordersTheseMonths.value) {
      ordersTheseMonths.value.forEach(({ node }) => {
        const date = new Date(node.createdAt)

        const month = date.getMonth()
        const year = date.getFullYear()

        const monthIndex = months.findIndex(m => m.month === month && m.year === year)
        if (monthIndex === -1) {
          months.push({ month, year })
          sales.push({ month, year, sales: 1 })
        } else {
          sales[monthIndex].sales++
        }
      })
    }
    return sales
  })

  const earningsMonthRange = computed(() => {
    const earnings = []
    const months = []

    if (ordersTheseMonths.value) {
      ordersTheseMonths.value.forEach(({ node }) => {
        const date = new Date(node.createdAt)
        const month = date.getMonth()
        const year = date.getFullYear()

        const monthIndex = months.findIndex(m => m.month === month && m.year === year)
        if (monthIndex === -1) {
          months.push({ month, year })
          earnings.push({ month, year, earnings: node.totalAmount })
        } else {
          earnings[monthIndex].earnings += node.totalAmount
        }
      })
    }
    return earnings
  })

  return {
    salesMonthRange,
    earningsMonthRange,
    loading,
    error,
    ordersTheseMonths,
  }
}
