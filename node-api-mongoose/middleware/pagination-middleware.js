module.exports = function (model) {
    return async (req, res, next) => {
        let {page, size} = req.query;

        if (!page || page < 1) page = 1;
        if (!size || size < 1) size = 10;

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const data = await model
            .find({name: new RegExp(req.query.name, 'i')})
            .limit(limit)
            .skip(skip);

        res.pagination = {page, size, totalElements: data.length ? data.length : 0, content: data};
        next();
    }
}