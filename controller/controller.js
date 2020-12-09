const fs = require('fs');
const { join } = require('path');
const filePath = join(__dirname, '../pessoas.json');

class ListaInvertidaController {
    constructor() {
        this.diretorios = {};
    }

    buscarSimplesPessoa(busca) {
        const pessoas = JSON.parse(fs.readFileSync(filePath));
        if (pessoas.length) {
            if (pessoas.some(pessoa => pessoa[busca.col] == busca.value)) {
                console.log(pessoa);
            } else {
                console.log('Pessoa não encontrada!')
            }
        } else {
            console.log('Nenhuma pessoa cadastrada!')
        }
    }

    criarPessoa(dados) {
        const pessoas = JSON.parse(fs.readFileSync(filePath));
        const { id, nome, cidade, time, estiloMusical } = dados;

        if (pessoas.some(pessoa => pessoa.id == id)) {
            console.log('ID já registrado');
            return
        }

        let pessoa = { id, nome, cidade, time, estiloMusical };

        pessoas.push(pessoa)

        fs.writeFileSync(filePath, JSON.stringify(pessoas, null, '\t'));

        this.incluirNoDiretorio(pessoa)

        console.log('-------------------------------------------------\n---------- Pessoa criada com sucesso! -----------\n-------------------------------------------------')
    }

    incluirNoDiretorio(dado) {
        for (let key in dado) {
            // if (this.diretorios[key]) {
                
            // }
        }
    }
}

const Controller = new ListaInvertidaController();

module.exports = Controller;