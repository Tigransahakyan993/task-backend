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
  return {
    id: dto.id,
    email: dto.email,
    first_name: dto.first_name,
    last_name: dto.last_name,
    role: dto.role,
  }
}