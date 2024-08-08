// class for pagination
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    paginate(resPerPage){
        // validate resPerPage and currentPage
        if(!Number.isInteger(resPerPage) || resPerPage < 1){
            throw new Error('Invalid resPerPage value. It must be a positive integer.');
        }

        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query.limit(resPerPage).skip(skip);
     
        return this;
    }
}

// export class
module.exports = APIFeatures;