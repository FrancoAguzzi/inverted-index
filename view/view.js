const readline = require("readline");
const Controller = require("../controller/controller.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class ListaInvertidaView {
    constructor() {
        this.telaInicial();
    }

    telaInicial() {
        const commands = [
            {
                Ação: 'Criar pessoa',
                Comando: 'C'
            },
            {
                Ação: 'Remover pessoa',
                Comando: 'R'
            },
            {
                Ação: 'Busca simples',
                Comando: 'BS'
            },
            {
                Ação: 'Busca composta',
                Comando: 'BC'
            },
            {
                Ação: 'Exibir todos dados',
                Comando: 'T'
            }
        ]
        console.log('\n\n---------- Lista Invertida ----------\n\n\n');
        console.table(commands)
        rl.question('\nComando: ', res => {
            switch (res) {
                case 'C':
                    this.telaCriarPessoa();
                    break
                case 'BS':
                    this.telaBuscaSimples();
                    break
                case 'BC':
                    this.telaBuscaComposta();
                    break
                case 'R':
                    this.telaRemoverPessoa();
                    break
                case 'T':
                    this.telaExibirTudo();
                    break
                default:
                    console.log('Comando não identificado!')
                    rl.close();
            }
        })
    }

    telaBuscaSimples() {
        let busca = {};
        console.log('\n\n--- Busca Simples ---\n\n\n')
        rl.question('Coluna de dados: ', col => {
            busca.col = col;
            rl.question('Valor da busca: ', value => {
                busca.value = value;
                Controller.buscaSimplesPessoa(busca);
                this.telaInicial();
            })
        })
    }

    telaBuscaComposta() {
        let busca1 = {};
        let busca2 = {};
        console.log('\n\n--- Busca Composta ---\n\n\n')
        rl.question('Coluna de dados 1: ', col => {
            busca1.col = col;
            rl.question('Valor da busca 1: ', value => {
                busca1.value = value;
                rl.question('Coluna de dados 2: ', col => {
                    busca2.col = col;
                    rl.question('Valor da busca 2: ', value => {
                        busca2.value = value;
                        Controller.buscaCompostaPessoa(busca1, busca2);
                        this.telaInicial();
                    })
                })
            })
        })
    }

    telaCriarPessoa() {
        let pessoa = {};
        console.log('\n\n--- Criar pessoa ---\n\n\n')
        rl.question("Id único: ", id => {
            pessoa.id = id;
            rl.question("Nome: ", name => {
                pessoa.nome = name;
                rl.question("Cidade: ", city =>  {
                    pessoa.cidade = city;
                    rl.question("Time: ", club =>  {
                        pessoa.time = club;
                        rl.question("Estilo Musical: ", music =>  {
                            pessoa.estiloMusical = music;
                            Controller.criarPessoa(pessoa);
                            this.telaInicial();
                        });
                    });
                });
            });
        })
    }

    telaRemoverPessoa() {
        console.log('\n\n--- Remover pessoa ---\n\n\n')
        rl.question("Id único: ", id => {
            Controller.removerPessoa(id);
            this.telaInicial();
        });
    }

    telaExibirTudo() {
        console.log('\n\n--- Exibir todos dados ---\n\n\n')
        Controller.exibirTodosDados();
        this.telaInicial();
    }
}

module.exports = ListaInvertidaView;