exports.toDto = (params) => {
  return {
    offset: isNaN(+params.offset) ? 0 : +params.offset,
    limit: isNaN(+params.limit) ? 10 : +params.limit,
    name: params.name,
  }
}
