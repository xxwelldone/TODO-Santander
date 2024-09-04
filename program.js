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

const tarefas = [];

function gerarId() {
  return tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1;
}

function adicionarTarefa(descricao) {
  const tarefa = {
    id: gerarId(),
    descricao: descricao,
  };
  tarefas.push(tarefa);
  console.log("\nTarefa adicionada com sucesso!");
  console.log(`ID: ${tarefa.id} e Descricao: ${tarefa.descricao}`);
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
  if (tarefas.length < 1) {
    console.log("\nNão há tarefas cadastradas.\n");
  } else {
    tarefas.forEach((item) => {
      console.table(item);
    });
  }
}

//TODO: Verificar possibilidades diferentes de table -> Daniel
//TODO: Remover atualização de ID; -> Yasmin
//TODO: Verificar se há itens antes de entrar em remover -> Yasmin
//TODO: Opção continuar para evitar que menu tome a tela. -> Yasmin

function removerTarefa(id) {
  if (tarefas.length > 0) {
    let tarefaRemovida = tarefas.splice(id, 1);
    console.log(
      `\nA tarefa "${tarefaRemovida[0].descricao.toUpperCase()}" foi removida com sucesso!`
    );
  }
}

function obterTarefa(idBuscar) {
  if (tarefas.length === 1) {
    return console.log(
      `Descricao da tarefa selecionada: ${tarefas[0].descricao}`
    );
  } else {
    return console.log(
      `Descricao da tarefa selecionada: ${tarefas[--idBuscar].descricao}`
    );
  }
}
//** Funções auxiliares
function validarId(msg) {
  const id = Number(readlineSync.question(msg));
  if (isNaN(id)) {
    console.log("\nID inválido. Deve ser um número.");
    return null;
  }
  return id;
}
function tarefaExiste(id) {
  if (tarefas.some((tarefa) => tarefa.id === id)) {
    return true;
  }
  console.log("\nTarefa não encontrada.\n");
  return false;
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
      const idEditar = validarId("Digite o ID da tarefa que deseja editar: ");

      if (idEditar !== null && tarefaExiste(idEditar)) {
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
      const idRemover = validarId("Digite o ID da tarefa que deseja remover: ");
      if (idRemover !== null && tarefaExiste(idRemover)) {
        const index = tarefas.findIndex((tarefa) => tarefa.id === idRemover);
        removerTarefa(index);
      }
      break;

    case "5":
      const idBuscar = validarId("Digite o ID da tarefa que deseja buscar: ");
      if (idBuscar !== null && tarefaExiste(idBuscar)) {
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
