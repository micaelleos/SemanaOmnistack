const connection = require('../database/connections');

module.exports = {
    async indexByProfile(request,response){
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

        return response.json(incidents)
    },

    async index(request,response){
        const {page = 1} = request.query;

        const count = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);

        response.header('X-Total-Count',count);

        return response.json(incidents)
    },

    async create(request,response){
        const { title, discription, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            discription,
            value,
            ong_id,
        });

        return response.json(id)
    },

    async delete(request,response){
        const ong_id = request.headers.authorization;
        const params = request.params;

        await connection('incidents')
        .where('ong_id',ong_id)
        .where('id', params.id)
        .delete();

        return response.status(204).send();

    },

    
}