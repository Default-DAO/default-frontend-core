export function round(money, decimal) {
  let round = 1 * Math.pow(10, decimal)
  money = Math.round(money * round) / round
  return money
}

export function format(money, decimal) {
  if (!money) return 0
  if (decimal) {
    money = round(money, decimal)
  }
  money = money.toString().split('.')
  money[0] = money[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (money[1]) {
    return money[0] + '.' + money[1]
  } else {
    return money[0]
  }
}