const orderItemsConverter = require('./orderItemsConverter');
const {orderStatus} = require('../../config');

exports.toDto = (data, create) => {
  if (create) {
   data.status = orderStatus.placed;
  }
  return {
    restaurantId: data.restaurantId,
    userId: data.userId,
    orderItems: data.orderItems.map(item => orderItemsConverter.toDto(item)),
    price: data.price,
    status: data.status,
  }
}

exports.fromDto = (dto) => {
  dto.orderItems = !dto.orderItems ? [] : dto.orderItems;

  return {
    id: dto.id,
    userId: dto.userId,
    status: dto.status,
    price: dto.price,
    orderItems: dto.orderItems.map(item => orderItemsConverter.fromDto(item)),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  }
}