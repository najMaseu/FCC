/*
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

• cid is a 2D array listing available currency.

• The checkCashRegister() function should always return an object with a status key and a change key.

• Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

• Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

• Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (DOLLAR)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
*/

function checkCashRegister(price, cash, cid) {
  let currencyUnits = {
    "ONE HUNDRED": 100 * 100,
    "TWENTY": 20 * 100,
    "TEN": 10 * 100,
    "FIVE": 5 * 100,
    "ONE": 1 * 100,
    "QUARTER": 0.25 * 100,
    "DIME": 0.1 * 100,
    "NICKEL": 0.05 * 100,
    "PENNY": 0.01 * 100
  }
  let changeArr = []
  let changeDue = (cash - price) * 100;
  let lastChange = changeDue;
  let cashInRegTimes100 = cid.reduce((prev, next) => {
    return (prev + 100 * next[1])
  }, 0);

  if (cashInRegTimes100 < changeDue) {
    return {
      status: "INSUFFICIENT_FUNDS",
      change: []
    }
  };
  if (cashInRegTimes100 == changeDue) {
    return {
      status: "CLOSED",
      change: cid
    }
  }
  let cidToObj = cid.reverse()
    .reduce((prev, current) => {
      prev[current[0]] = current[1] * 100
      return prev
    }, {})
  let temp = 0

  for (let key in cidToObj) {
    temp = 0
    while (currencyUnits[key] <= changeDue && cidToObj[key] > 0) {
      changeDue -= currencyUnits[key]
      temp += currencyUnits[key];
      cidToObj[key] -= currencyUnits[key]
    }
    changeArr.push([key, temp])
  }

  if (lastChange > changeArr.reduce((prev, next) => {
      return (prev + next[1])
    }, 0)) {
    return {
      status: "INSUFFICIENT_FUNDS",
      change: []
    }
  }

  return ({
    status: "OPEN",
    change: changeArr.filter(x => {
        if (x[1] != 0) {
          return true
        }
      })
      .map(x => {
        return [x[0], x[1] / 100]
      })
  })

}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);
