class ApiResponse extends Error{
    constructor(statusCode,message){
        super()
        this.statusCode=statusCode,
        this.message=message
    }
}

export {ApiResponse}