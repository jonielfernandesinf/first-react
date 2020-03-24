const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('incidents') //entendi que [count] faz o mesmo que count[0]
            .count();

        const incidents = await connection('incidents')
                        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                        .limit(5)
                        .offset((page - 1) * 5)
                        .select(['incidents.*', 'ongs.name as ong_name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response){
        const {title, name, description, value} = request.body;
        console.log({title, name, description, value});
        const ong_id = request.headers.authorization;

        //console.log(request.query); //para query params: endereco?pag=1

        const result = await connection('incidents').insert({title, name, description, value, ong_id});

        return response.json(result[0]);
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
                            .where('id', id).select('ong_id')
                            .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permited.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};