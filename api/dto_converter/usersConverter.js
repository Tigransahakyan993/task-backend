exports.toDto = (data) => {

  return {
    email: data.email,
    password: data.password.toLowerCase(),
    first_name: data.first_name,
    last_name: data.last_name,
    role: data.role,
    }
}

exports.fromDto = (dto) => {
  const role = Array.isArray(dto.role) ? dto.role[0] : dto.role

  return {
    id: +dto.id,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    role: role,
  }
}