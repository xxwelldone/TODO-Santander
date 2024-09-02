// 1 - Adicionar; => e menu (Lucas) - OK
// 2 - Editar; = > wesley
// 3 - Remover; => Yasmin
// 4 - Listar todos; => wesley
// 5 - Obter via ID; => Daniel
// 6 - Sair => lucas - OK

// npm i readline-sync
//const prompt = require(" readline-sync");

//Validação de entrada dos dados nos itens Editar, Remover, Obter via ID; - OK
//voltar (optcional)

const readlineSync = require("readline-sync");

let tarefas = [];

function gerarId() {
  // return Math.floor(Math.random() * Date.now());
  let id = 1;
	if (tarefas.length > 0) {
		let ultimaTarefa = tarefas.length - 1;
		id = tarefas[ultimaTarefa].id + 1;
    return id;
	}
	return id;
}

function adicionarTarefa(descricao) {
  const tarefa = {
    id: gerarId(),
    descricao: descricao,
  };
  tarefas.push(tarefa);
  console.log("\nTarefa adicionada com sucesso!");
  console.log(tarefa);
}
function editarTarefa(idEditar, novaDescricao) {
  const index = tarefas.findIndex((item) => {
    return item.id === idEditar;
  });
  tarefas[index].descricao = novaDescricao;
  console.log(tarefas);
}
function listarTarefas() {
  console.log("Listagem de tarefas:  ");

  tarefas.forEach((item) => {
    console.table(item);
  });
}

function removerTarefa(id) {
  if (tarefas.length > 0) {
    let tarefaRemovida = tarefas.splice(id, 1);
    console.log("Tarefa removida com sucesso!");
    tarefaRemovida.forEach((tarefa) => console.log(tarefa));
  } else {
    console.log("Lista de tarefas vazia!");
  }
}

function menu() {
  console.log(`
O que você gostaria de fazer?
1. Adicionar Tarefa
2. Editar Tarefa
3. Listar Tarefas
4. Remover Tarefa
5. Buscar Tarefa por ID
6. Sair
    `);

  const opcao = readlineSync.question("Escolha uma opcao: ");

  switch (opcao) {
    case "1":
      const descricao = readlineSync.question("Digite a descrição da tarefa: ");
      adicionarTarefa(descricao);
      break;
    case "2":
      const idEditar = parseInt(
        readlineSync.question("Digite o ID da tarefa que deseja editar: ")
      );
      if (isNaN(idEditar)) {
        console.log("\nID inválido. Deve ser um número.");
      } else if (!tarefas.some((tarefa) => tarefa.id === idEditar)) {
        console.log("Tarefa não encontrada.\n");
      } else {
        const novaDescricao = readlineSync.question(
          "Digite a nova descrição da tarefa: "
        );
        editarTarefa(idEditar, novaDescricao);
      }
      break;
    case "3":
      listarTarefas();
      break;
    case "4":
      const idRemover = parseInt(
        readlineSync.question("Digite o ID da tarefa que deseja remover: ")
      );
      const index = tarefas.findIndex((tarefa) => tarefa.id === idRemover);
      if (isNaN(idRemover)) {
        console.log("\nID inválido. Deve ser um número.");
      } else if (index === -1) {
        console.log("Tarefa não encontrada.\n");
      } else {
        removerTarefa(index);
      }
      break;
    case "5":
      const idBuscar = parseInt(
        readlineSync.question("Digite o ID da tarefa que deseja buscar: ")
      );
      if (isNaN(idBuscar)) {
        console.log("\nID inválido. Deve ser um número.");
      } else if (!tarefas.some((tarefa) => tarefa.id === idBuscar)) {
        console.log("Tarefa não encontrada.\n");
      } else {
        obterTarefa(idBuscar);
      }
      break;
    case "6":
      console.log("\nSaindo da aplicação. Até logo!");
      process.exit(0);
    default:
      console.log("\nOpção inválida. Por favor, tente novamente.");
  }
}

function main() {
  console.log("Bem-vindo(a)! Lista de Tarefas Santander Coders 2024");
  while (true) {
    menu();
  }
}

main();
