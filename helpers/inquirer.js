const inquirer = require('inquirer');
const { choices } = require('./inquirier_options');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: choices
    }
];

const inquirerMenu = async() => {

    console.clear();
    console.log('===========================' .green);
    console.log('   Selecciona una opción   ' .white);
    console.log('===========================\n' .green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    const pregunta = {
        type: 'input',
        name: 'enter',
        message: `\nPresione ${ 'ENTER' .green} para continuar`
    }

    console.log('\n');
    await inquirer.prompt(pregunta);
}


const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0){
                    return 'Por faor ingrese un valor'
                }

                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);

    return desc;
}

const listadoTareasBorrar = async ( tareas = [] ) => {
    const choices = tareas.map(  (tarea, index) => {

        const indice = `${ index + 1 }`.green;
        return {
            value: tarea.id,
            name: `${ indice}  ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas);
    return id;

}


const listadoTareasCheckList = async ( tareas = [] ) => {
    const choices = tareas.map(  (tarea, index) => {

        const indice = String(index + 1 ).green + '.'.green;

        return {
            value: tarea.id,
            name: `${ indice}  ${ tarea.desc }`,
            checked: (tarea.completadoEn) ? true : false
        }

    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}



const confirmar =  async (message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    listadoTareasCheckList,
    confirmar
}