require('colors');
const { 
    inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    listadoTareasCheckList,
    confirmar
} = require('./helpers/inquirer');

const { 
    guardarInformacion,
    leerInformacion 
} = require('./helpers/guardarArchivo');

const Tareas = require('./models/tareas');

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerInformacion();
    
    tareas.cargarTareasDesdeArreglo(tareasDb);

    do{
        // Imprimir el menú
        opt = await inquirerMenu();

        switch(opt){
            case '1': 
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );   
                break;
            case '2':
                console.log('');
                console.log( tareas.listadoCompleto() );
                break;
            case '3': 
                console.log('');
                console.log( tareas.listarPendientesCompletadas(true) );
                break;
            case '4':
                console.log('');
                console.log( tareas.listarPendientesCompletadas(false) );
                break;
            case '5':
                console.log('');
                const ids = await listadoTareasCheckList(tareas.listadoArr);
                if(ids.length > 0){
                    tareas.toogleCompletadas( ids );
                    console.log('Las tareas han sido completadas');
                }
                break;
            case '6':
                console.log('');
                const id = ( await listadoTareasBorrar(tareas.listadoArr) );
                if(id === '0') break;
                const ok = await confirmar('¿Esta seguro?');
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada con exito');
                }
        }

        guardarInformacion( tareas.listadoArr );

        await pausa();

    }while( opt !== '0');
}

main();