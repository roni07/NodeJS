const pageDetails = (page, size) => {

    const pageData = {};

    pageData.page = parseInt(page);
    pageData.size = parseInt(size);

    pageData.limit = pageData.size;
    pageData.skip = (pageData.page - 1) * pageData.size;

    return pageData;
}

const paginationResult = (pageData, data, totalElements) => {

    return {
        page: pageData.page,
        size: pageData.size,
        totalElements: totalElements,
        content: data
    }
}

module.exports = {pageDetails, paginationResult};
