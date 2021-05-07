exports.toDto = (data) => {

  return {
    name: data.name,
    description: data.description,
    price: data.price,
    restaurantId: data.restaurantId
  }
}

exports.fromDto = (dto) => {

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    price: dto.price,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    restaurantId: dto.restaurantId,
  }
}