const orderItemsConverter = require('./orderItemsConverter');
const {orderStatus} = require('../../config');

exports.toDto = (data, create) => {
  const orderItems = data.orderItems ? data.orderItems : [];
  if (create) {
   data.status = orderStatus.placed;
  }
  return {
    id: data.id,
    restaurantId: data.restaurantId,
    userId: data.userId,
    orderItems: orderItems.map(item => orderItemsConverter.toDto(item)),
    price: data.price,
    status: data.status,
  }
}

exports.fromDto = (dto) => {
  dto.orderItems = !dto.orderItems ? [] : dto.orderItems;
  const count = dto.count ? dto.count : 0;
  return {
    id: dto.id,
    restaurantId: dto.restaurantId,
    userId: dto.userId,
    status: dto.status,
    price: dto.price,
    orderItems: dto.orderItems.map(item => orderItemsConverter.fromDto(item)),
    count,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  }
}