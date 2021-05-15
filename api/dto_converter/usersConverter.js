const {userRole} = require("../../config");

exports.toDto = (data) => {
  const roles = ['buyer', 'owner'];
  const role = roles.includes(data.role) ? data.role : userRole.buyer;

  return {
    email: data.email,
    password: data.password.toLowerCase(),
    first_name: data.first_name,
    last_name: data.last_name,
    role: role,
    }
}

exports.fromDto = (dto) => {
  const fields = ['id', 'email', 'first_name', 'last_name', 'role'];
  dto.role = Array.isArray(dto.role) ? dto.role[0] : dto.role;
  if (dto.role === userRole.owner) {
    fields.push('restaurantId');
    dto.restaurantId = dto.restaurants[0].id;
  }
  return fields.reduce((prev, next) => {
    prev[next] = dto[next];
    return prev;
  }, {})
}