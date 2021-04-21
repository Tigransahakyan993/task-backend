exports.toDto = (data) => {

  return {
    restaurantId: data.restaurantId,
    name: data.name,
    description: data.description,
    price: data.price,
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
  }
}