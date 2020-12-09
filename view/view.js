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
                Ação: 'Busca simples',
                Comando: 'BS'
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
                Controller.buscarSimplesPessoa(busca);
                this.telaInicial();
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
}

const tela = new ListaInvertidaView()