const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys( this._listado ).forEach(key => {
            
            const tarea = this._listado[key];
            
            listado.push( tarea );
        })
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    cargarTareasDesdeArreglo(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto(){
        let listado = '';
        const claves = Object.keys(this._listado);
        
        claves.forEach((tarea, index) => {
            const { desc, completadoEn } = this._listado[tarea];
            const estado = completadoEn ? 'Completado' .green : 'Pendiente' .red ;
            
            listado += 
                `${ String(index + 1) .green }. ${ desc } :: ${ estado }\n`;
        })

        return listado;
    }

    listarPendientesCompletadas(completadas = true){
        let listado = '';
        const claves = Object.keys(this._listado);
        let contador = 0;
        claves.forEach(tarea => {
            const { desc, completadoEn } = this._listado[tarea];
            const estado = completadoEn ? 'Completado' .green : 'Pendiente' .red ;
            if(completadas){
                if( completadoEn ){
                    contador += 1;
                    listado += 
                    `${ String(contador) .green }. ${ desc } :: ${ completadoEn .green }\n`;
                }
            }else{
                if( !completadoEn ){
                    contador += 1;
                    listado += 
                    `${ String(contador) .green }. ${ desc } :: ${ estado }\n`;
                }
            }
        })

        return listado;
    }

    borrarTarea( id = '' ){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toogleCompletadas(ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea[id].completadoEn = new Date();
            }
        } )
    }

}

module.exports = Tareas;