
export const getPriceRange=(price)=>
{
    let priceRange="0-5000"


    if (price>=0 && price<=5000)
    {
      priceRange='0-5000'
    }
    else if (price<=10000 && price>5000)
    {
      priceRange='5000-10000'
    }
    else if(price<=25000 && price>10000)
    {
      priceRange='10000-25000'
    }
    else if(price<=50000 && price>20000)
    {
      priceRange='25000-50000'
    }
    else if(price<=100000 && price>50000)
    {
      priceRange='50000-100000'
    }
    else
    {
      priceRange='100000+'
    }

    return priceRange

}

export const getDiscountRange=(discount)=>
{

  let discountRange='0-10'
  if(discount>=0 && discount<=10)
  {
    discountRange='0-10'
  }
  else if (discount<=20 && discount>10)
  {
    discountRange="10-20"

  }
  else if(discount<=30 && discount>20)
  {
    discountRange='20-30'
  }
  else if(discount<=50 && discount>30)
  {
    discountRange='30-50'
  }
  else if(discount<=70 && discount>50)
  {
    discountRange='50-70'
  }
  else if(discountRange<=90 && discount>70)
  {
    discountRange='70-90'
  }
  else
  {
    discountRange='90-100'
  }

  return discountRange
}
