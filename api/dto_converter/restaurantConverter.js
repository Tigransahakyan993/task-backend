const productConverter = require('./productConverter')

exports.toDto = (data) => {

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    userId: data.userId,
  }
}

exports.fromDto = (dto) => {
  const products = dto.products ? dto.products : [];

  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    products: products.map(item => productConverter.fromDto(item)),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  }
}