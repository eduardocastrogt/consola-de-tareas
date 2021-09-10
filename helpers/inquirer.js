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
    console.log('   Selecciona una opción   ' .green);
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


module.exports = {
    inquirerMenu,
    pausa
}