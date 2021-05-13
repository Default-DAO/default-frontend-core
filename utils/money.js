export function format(money, decimal) {
  if (decimal) {
    money = Math.round(money * 100) / 100
  }
  money = money.toString().split('.')
  money[0] = money[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (money[1]) {
    return money[0] + '.' + money[1]
  } else {
    return money[0]
  }
}