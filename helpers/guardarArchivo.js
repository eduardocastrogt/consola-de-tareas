const fs = require('fs');
const archivo = './db/data.json';

const guardarInformacion = (data) => {
    fs.writeFileSync( archivo, JSON.stringify(data) );
}

const leerInformacion = () => {
    if( !fs.existsSync(archivo) ){
        return null;
    }

    return JSON.parse( fs.readFileSync( archivo, {encoding: 'utf-8'} ) );
}


module.exports = {
    guardarInformacion,
    leerInformacion
}