const connection = require('../database/connections');

module.exports = {
    async create(request,response){
        const ong_id = request.body;
        
        const name = await connection('ongs')
        .where('id',ong_id.id)
        .select('name')
        .first();

        if(!name){
            return response.status(404).json({erro:"No such ONG found with this ID."})
        }

        return response.json(name)

    },

    
}