enum statusCodes {
    badRequest = 400,
    notFound = 404,
    default = 500,
};

class CustomError extends Error {
    statusCode: number;

    constructor(message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCodes.badRequest 
            | statusCodes.notFound 
            | statusCodes.default
    }
}

class BadRequestError extends CustomError {
    statusCode: number;
  
    constructor(message: string | undefined) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCodes.badRequest;
    }
}

class NotFoundError extends CustomError {
    statusCode: number;

    constructor(message: string | undefined) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCodes.notFound;
    }
}

export { 
    statusCodes,
    CustomError,
    BadRequestError,
    NotFoundError
}
