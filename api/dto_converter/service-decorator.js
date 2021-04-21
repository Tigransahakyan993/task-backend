
exports.getById = async (service, converter, id) => {
    const data = await service.getById(id);
    return converter.fromDto(data);
}

exports.getAll = async (service, converter, args) => {
    const data = service.getAll(args);
    return exports.convertAll(data, converter)
}

exports.convertAll = async (data, converter) => {
    if (data instanceof Promise) {
        data = await data;
    }
    if (!Array.isArray(data.rows)) {
        throw "Data should be array";
    }
    return data.rows.map((item) => converter.fromDto(item))
}

exports.create = async (service, converter, args) => {
    const dataToDto = converter.toDto(args);
    const data = await service.create(dataToDto, 'create');
    return converter.fromDto(data);
}

exports.update = async (service, converter, args) => {
    const dataToDto = converter.toDto(args);
    const data = await service.update(dataToDto);
    return converter.fromDto(data);
}

exports.delete = async (service, converter, id) => {
    return await service.delete(id);
}