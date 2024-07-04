// await schema.parseAsync(req.body):- is the line where you use zod to validate the request body data against the define schema


export const zodValidator = (schema) => async (req,res,next) =>{
    try {

        const parseBody = await schema.parseAsync(req.body)
        req.body = parseBody
        next()
        
    } catch (error) {
        console.log()
        return res.status(404).json({
            message:error.errors[0].message     
        })
    }
}