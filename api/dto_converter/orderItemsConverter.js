exports.toDto = (data) => {

  return {
    productId: data.id,
    count: data.count,
  }
}

exports.fromDto = (dto) => {

  return {
    id: dto.id,
    orderId: dto.orderId,
    name: dto.name,
    count: dto.count,
    price: dto.price,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  }
}