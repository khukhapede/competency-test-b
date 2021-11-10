function checkDiscount(quality, quantity){
  let price = 0
  let discount = 0
  let totalPrice = 0
  let totalDiscount = 0
  let discountPrice = 0



  if ((quality == 'A' || quality =='a') && quantity > 13 ){
    price = 4550
    discount = 231

    totalPrice = price * quantity
    totalDiscount = discount * quantity
    discountPrice = totalPrice - totalDiscount

    console.log(`total harga: ${totalPrice}`)
    console.log(`potongan: ${totalDiscount}`)
    console.log(`yang harus dibayar: ${discountPrice}`)
  }else if (quality == 'A' || quality =='a'){
    price = 4550
    discount = 0

    totalPrice = price * quantity
    discountPrice = totalPrice - totalDiscount

    console.log(`total harga: ${totalPrice}`)
    console.log(`potongan: ${totalDiscount}`)
    console.log(`yang harus dibayar: ${discountPrice}`)

  }else if ((quality == 'B' || quality =='b') && quantity > 7) {
    price = 5330
    discount = .23

    totalPrice = price * quantity
    totalDiscount = discount * totalPrice
    discountPrice = totalPrice - totalDiscount

    console.log(`total harga: ${totalPrice}`)
    console.log(`potongan: ${totalDiscount}`)
    console.log(`yang harus dibayar: ${discountPrice}`)
  } else if (quality == 'B' || quality =='b'){
    price = 5330
    discount = 0

    totalPrice = price * quantity
    discountPrice = totalPrice - totalDiscount

    console.log(`total harga: ${totalPrice}`)
    console.log(`potongan: ${totalDiscount}`)
    console.log(`yang harus dibayar: ${discountPrice}`)
  }else if (quality == 'C' || quality == 'c'){
    price = 8654
    discount = 0

    totalPrice = price * quantity
    discountPrice = totalPrice - totalDiscount

    console.log(`total harga: ${totalPrice}`)
    console.log(`potongan: ${totalDiscount}`)
    console.log(`yang harus dibayar: ${discountPrice}`)
  }else {
    console.log(`invalid input!!!`)
  }
}

checkDiscount('a', 6)