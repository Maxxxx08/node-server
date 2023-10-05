const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function showTasks() {
  console.log('Lista de tareas:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.description}`);
  });
}

function addTask(description) {
  tasks.push({ description, completed: false });
  console.log('Tarea añadida.');
  showTasks();
}
//funcion para borrar tarea/ se eliminan por el id
function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    console.log('Tarea eliminada.');
  } else {
    console.log('Numero de Tarea invalido');
  }
  showTasks();
}

function completeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    console.log('Tarea completada.');
  } else {
    console.log('Índice de tarea no válido.');
  }
  showTasks();
}

rl.setPrompt('Ingrese un comando (añadir/borrar/completar/salir): ');
rl.prompt();

rl.on('line', (input) => {
  const [command, ...args] = input.trim().split(' ');
  switch (command) {
    case 'añadir':
      addTask(args.join(' '));
      break;
    case 'borrar':
      deleteTask(parseInt(args[0]) - 1);
      break;
    case 'completar':
      completeTask(parseInt(args[0]) - 1);
      break;
    case 'salir':
      rl.close();
      break;
    default:
      console.log('Comando no válido.');
  }
  rl.prompt();
});

rl.on('close', () => {
  console.log('Saliendo del programa.');
  process.exit(0);
});
