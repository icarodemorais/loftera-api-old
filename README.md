# Loftera - API

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Loftera é uma aplicação Web que faz a intermediação entre estudantes de ensino médio e superior, que procuram por outros estudantes para viverem juntos.

# Swager!

  - A documentação dos end-poins disponíves no momento pode ser acessada no arquivo de configuração do swager adicionado no projeto e pode ser visulizado [Aqui](https://editor.swagger.io/).

### Tech

* [Bootstrap](https://getbootstrap.com/) - para padronização da ui
* [node.js] - '0'
* [Express] - framework de rede do node [@tjholowaychuk]
* [Sequelize](https://getbootstrap.com/) - ORM do node
* [jQuery] - obvio né padrin

### Instalação

O loftera precisa do [Node.js](https://nodejs.org/) v10+ e MySql v5.6+ para rodar.

Instale as dependências:

```sh
$ cd loftera-api
$ yarn install
```

Configure as credencias do banco de dados no arquivo:

```sh
$ nano /config/database.js
```

*É necessário ter um banco de dados no seu servicor mysql local com o mesmo nome do campo "database" do arquivo mencionado no passo anterior.*

Na pasta base do projeto, execute as migratins com o seguinte comando:

```sh
$ yarn sequelize db:migrate
```
*É necessário ter o CLI do sequelize instalado*

Starte a API com o seguinte comando na pasta base do projeto:

```sh
$ nodemon app.js
```