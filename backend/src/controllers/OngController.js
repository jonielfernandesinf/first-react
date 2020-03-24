const crytpo = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crytpo.randomBytes(4).toString('HEX');

        //console.log(request.query); //para query params: endereco?pag=1
        console.log(id); //para route params: endereco/users/1

        await connection('ongs').insert({id, name, email, whatsapp, city, uf});

        return response.json(id);
    }
};