const getLocalGoodsList = () => {
  return JSON.parse(localStorage.getItem('mygoods') || '[]')
}

const getTotalCount = () => {
  // 获取之前的
  const localGoodsList = getLocalGoodsList()

  let totalCount = 0
  localGoodsList.forEach(item=>{
    totalCount += item.num
  })

  return totalCount
}

const addLocalGoods = goods => {
  // 获取之前的
  const localGoodsList = getLocalGoodsList()

  // 判断之前的是否存在
  const oldGoods = localGoodsList.find(item=>item.id === goods.id)
  if(oldGoods){
    oldGoods.num += goods.num
  } else {
    localGoodsList.push(goods)
  }

  localStorage.setItem('mygoods',JSON.stringify(localGoodsList))

  return getTotalCount()
}

export {
  addLocalGoods,
  getLocalGoodsList,
  getTotalCount
}
