// 1 - Adicionar; => e menu (Lucas) - OK
// 2 - Editar; => wesley - OK
// 3 - Remover; => Yasmin - OK
// 4 - Listar todos; => wesley - OK
// 5 - Obter via ID; => Daniel - OK
// 6 - Sair => lucas - OK
//Validação de entrada dos dados nos itens Editar, Remover, Obter via ID; - OK
//voltar (optcional) - OK
//TODO: Verificar possibilidades diferentes de table -> Daniel

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
  console.log(`ID: ${tarefa.id} - Descricao: ${tarefa.descricao}`);
}

function editarTarefa(idEditar, novaDescricao) {
  const index = tarefas.findIndex((item) => item.id === idEditar);
  tarefas[index].descricao = novaDescricao;
  console.log(tarefas[index]);
}

function listarTarefas() {
  console.log("Listagem de tarefas: ");
  tarefas.forEach((item) => {
    console.table(item);
  });
}

function removerTarefa(idRemover) {
  const index = tarefas.findIndex((tarefa) => tarefa.id === idRemover);
  const tarefaRemovida = tarefas.splice(index, 1);
  console.log(
    `\nA tarefa com o ID ${idRemover} - "${tarefaRemovida[0].descricao.toUpperCase()}", foi removida com sucesso!`
  );
}

function obterTarefa(idBuscar) {
  if (tarefas.length === 1) {
    return console.log(
      `\nDescricao da tarefa selecionada: ${tarefas[0].descricao}`
    );
  } else {
    return console.log(
      `\nDescricao da tarefa selecionada: ${tarefas[--idBuscar].descricao}`
    );
  }
}

function adicionarNovamente() {
  criarLoop(() => {
    const descricao = readlineSync.question("\nDigite a descrição da tarefa: ");
    if (verificarDescricaoVazia(descricao) !== null) {
      adicionarTarefa(descricao);
    }
    return true;
  }, "Deseja adicionar outra tarefa? (sim/nao): ");
}

function editarNovamente() {
  criarLoop(() => {
    const idEditar = validarId("\nDigite o ID da tarefa que deseja editar: ");
    console.log(tarefaExiste(idEditar));

    if (idEditar !== null && tarefaExiste(idEditar)) {
      obterTarefa(idEditar);
      const novaDescricao = readlineSync.question(
        "\nDigite a nova descrição da tarefa: "
      );
      if (verificarDescricaoVazia(novaDescricao) !== null) {
        editarTarefa(idEditar, novaDescricao);
      }
    }
    return true;
  }, "Deseja editar outra tarefa? (sim/nao): ");
}

function removerNovamente() {
  criarLoop(() => {
    const idRemover = validarId("\nDigite o ID da tarefa que deseja remover: ");
    if (idRemover !== null && tarefaExiste(idRemover)) {
      removerTarefa(idRemover);
    }
    if (tarefas.length < 1) {
      console.log("\nLista de tarefas vazia.");
      return false;
    }
    return true;
  }, "Deseja remover outra tarefa? (sim/nao): ");
}

function obterNovamente() {
  criarLoop(() => {
    const idBuscar = validarId("\nDigite o ID da tarefa que deseja buscar: ");
    if (idBuscar !== null && tarefaExiste(idBuscar)) {
      obterTarefa(idBuscar);
    }
    return true;
  }, "Deseja buscar outra tarefa? (sim/nao): ");
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
  const tarefaEncontrada = tarefas.some((tarefa) => tarefa.id === id);
  if (!tarefaEncontrada) {
    console.log("\nTarefa não encontrada.");
  }
  return tarefaEncontrada;
}

function obterConfirmacao(pergunta) {
  let resposta;
  do {
    resposta = readlineSync.question(`\n${pergunta}`).toLowerCase();
    if (resposta !== "sim" && resposta !== "nao") {
      console.log("\nDesculpe, valor inválido. Digite apenas 'sim' ou 'nao'.");
    }
  } while (resposta !== "sim" && resposta !== "nao");
  return resposta;
}

function criarLoop(funcao, mensagemConfirmacao) {
  let continuar = "sim";
  while (continuar === "sim") {
    const resultado = funcao();
    if (resultado === false) {
      break;
    }
    continuar = obterConfirmacao(mensagemConfirmacao);
  }
  console.log("\nVoltando ao menu principal...");
}

function verificarDescricaoVazia(descricao) {
  if (!descricao) {
    console.log("\nA descrição da tarefa não pode ser vazia.");
    return null;
  }
  return descricao;
}

function verificarTarefasCadastradas(funcao) {
  if (tarefas.length > 0) {
    funcao();
  } else {
    console.log("\nNão há tarefas cadastradas.");
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
      console.log("\nVocê escolheu adicionar tarefa.");
      adicionarNovamente();
      break;

    case "2":
      console.log("\nVocê escolheu editar tarefa.");
      verificarTarefasCadastradas(editarNovamente);
      break;

    case "3":
      console.log("\nVocê escolheu listar todas as tarefas.");
      verificarTarefasCadastradas(listarTarefas);
      break;

    case "4":
      console.log("\nVocê escolheu remover tarefa.");
      verificarTarefasCadastradas(removerNovamente);
      break;

    case "5":
      console.log("\nVocê escolheu buscar tarefa por ID.");
      verificarTarefasCadastradas(obterNovamente);
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
