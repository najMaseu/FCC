/*
Convert the given number into a roman numeral.
All roman numerals answers should be provided in upper-case.
*/
function convertToRoman(num) {

  let numberArab = num
  let myArr = []

  let recSub =
    (x, subtractThis, testedRomVal) => {
      if (x < subtractThis) {
        return
      }
      myArr.push(testedRomVal)
      numberArab = x - subtractThis
      recSub(x - subtractThis, subtractThis, testedRomVal)
    }

  recSub(numberArab, 1000, "M")
  recSub(numberArab, 900, "CM")
  recSub(numberArab, 800, "DCCC")
  recSub(numberArab, 700, "DCC")
  recSub(numberArab, 600, "DC")
  recSub(numberArab, 500, "D")
  recSub(numberArab, 400, "CD")
  recSub(numberArab, 300, "CCC")
  recSub(numberArab, 200, "CC")
  recSub(numberArab, 100, "C")
  recSub(numberArab, 90, "XC")
  recSub(numberArab, 80, "LXXX")
  recSub(numberArab, 70, "LXX")
  recSub(numberArab, 60, "LX")
  recSub(numberArab, 50, "L")
  recSub(numberArab, 40, "XL")
  recSub(numberArab, 30, "XXX")
  recSub(numberArab, 20, "XX")
  recSub(numberArab, 10, "X")
  recSub(numberArab, 9, "IX")
  recSub(numberArab, 8, "VIII")
  recSub(numberArab, 7, "VII")
  recSub(numberArab, 6, "VI")
  recSub(numberArab, 5, "V")
  recSub(numberArab, 4, "IV")
  recSub(numberArab, 3, "III")
  recSub(numberArab, 2, "II")
  recSub(numberArab, 1, "I")

  return myArr.join("")
}
