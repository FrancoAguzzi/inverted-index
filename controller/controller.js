const fs = require('fs');
const { join } = require('path');
const filePathPessoa = join(__dirname, '../mem_secundaria/pessoas.json');
const filePathDiretorios = join(__dirname, '../mem_principal/diretorios.json');

class ListaInvertidaController {
    buscaSimplesPessoa(busca) {
        const diretorios = JSON.parse(fs.readFileSync(filePathDiretorios));
        const diretorioDeBusca = diretorios[busca.col];
        if (diretorioDeBusca) {
            if (diretorioDeBusca[busca.value]) {
                console.log(`Busca Simples realizada com sucesso!\n\nNúmero de resultados: ${diretorioDeBusca[busca.value].length}\n\nID Único dos resultados: ${diretorioDeBusca[busca.value]}`);
            } else {
                console.log('Nenhuma pessoa encontrada para a busca solicitada!')
            }
        } else {
            console.log('Nenhuma pessoa encontrada para a busca solicitada!')
        }
    }

    buscaCompostaPessoa(busca1, busca2) {
        const diretorios = JSON.parse(fs.readFileSync(filePathDiretorios));
        const diretorioDeBusca1 = diretorios[busca1.col];
        const diretorioDeBusca2 = diretorios[busca2.col];
        let busca1Ids, busca2Ids;
        const arrayResultado = [];
        if (diretorioDeBusca1 && diretorioDeBusca2) {
            diretorioDeBusca1[busca1.value] ? busca1Ids = diretorioDeBusca1[busca1.value] : busca1Ids = [];
            diretorioDeBusca2[busca2.value] ? busca2Ids = diretorioDeBusca2[busca2.value] : busca2Ids = [];

            const maiorTamanho = busca2Ids.length > busca1Ids.length ? busca2Ids.length : busca1Ids.length;
            for (let i = 0; i < maiorTamanho; i++) {
                if (busca2Ids.indexOf(busca1Ids[i]) > -1) {
                    arrayResultado.push(busca1Ids[i]);
                }
            }

            if (arrayResultado.length) {
                console.log(`Busca Composta realizada com sucesso!\n\nNúmero de resultados: ${arrayResultado.length}\n\nID Único dos resultados: ${arrayResultado}`);
            } else {
                console.log('Nenhuma pessoa encontrada para a busca solicitada!')
            }
        } else {
            console.log('Nenhuma pessoa encontrada para a busca solicitada!')
        }
    }

    criarPessoa(dados) {
        const pessoas = JSON.parse(fs.readFileSync(filePathPessoa));
        const { id, nome, cidade, time, estiloMusical } = dados;

        if (pessoas.some(pessoa => pessoa.id == id)) {
            console.log('ID já registrado');
            return
        }

        let pessoa = { id, nome, cidade, time, estiloMusical };

        pessoas.push(pessoa)

        fs.writeFileSync(filePathPessoa, JSON.stringify(pessoas, null, '\t'));

        this.incluirNoDiretorio(pessoa)

        console.log('-------------------------------------------------\n---------- Pessoa criada com sucesso! -----------\n-------------------------------------------------')
    }

    removerPessoa(id) {
        const pessoas = JSON.parse(fs.readFileSync(filePathPessoa));
        const arrayFiltrado = pessoas.filter(pessoa => pessoa.id != id); 

        if (pessoas.length == arrayFiltrado.length) {
            console.log('ID informado não foi cadastrado')
        } else {
            this.removerDosDiretorios(id);
            console.log('Pessoa removida com sucesso!')
            fs.writeFileSync(filePathPessoa, JSON.stringify(arrayFiltrado, null, '\t'));
        }
    }

    incluirNoDiretorio(dado) {
        const diretorios = JSON.parse(fs.readFileSync(filePathDiretorios));
        for (let key in dado) {
            if (key != "id" && key != "nome") {
                if (diretorios[key] == undefined) {
                    diretorios[key] = {};
                }
                if (diretorios[key][`${dado[key]}`] == undefined) {
                    diretorios[key][`${dado[key]}`] = [dado["id"]];
                } else {
                    diretorios[key][`${dado[key]}`].push(dado["id"]);
                }
                fs.writeFileSync(filePathDiretorios, JSON.stringify(diretorios, null, '\t'));
            }
        }
    }

    removerDosDiretorios(id) {
        const diretorios = JSON.parse(fs.readFileSync(filePathDiretorios));

        for (let key1 in diretorios) {
            for (let key2 in diretorios[key1]) {
                let index = diretorios[key1][key2].indexOf(id) 
                if (index > -1) {
                    diretorios[key1][key2].splice(index, 1);
                    if (diretorios[key1][key2].length == 0) {
                        delete diretorios[key1][key2]
                    }
                }
            }
        }
        
        fs.writeFileSync(filePathDiretorios, JSON.stringify(diretorios, null, '\t'));
    }

    exibirTodosDados() {
        const diretorios = JSON.parse(fs.readFileSync(filePathDiretorios));

        for (let key1 in diretorios) {
            console.log(`\n\nExibindo opções do diretório: ${key1}\n`)
            for (let key2 in diretorios[key1]) {
                console.log(`${key2}: ${diretorios[key1][key2]}`)
            }
        }
    }
}

const Controller = new ListaInvertidaController();

module.exports = Controller;