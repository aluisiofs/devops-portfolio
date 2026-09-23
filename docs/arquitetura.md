# Arquitetura do Projeto DevOps Portfolio

## 1. Visão Geral

O projeto DevOps Portfolio foi desenvolvido como entrega final da Semana 8 da Trilha DevOps Júnior NTT Data.

A arquitetura utiliza uma aplicação Node.js executada em container Docker e um banco de dados PostgreSQL executado em outro container.

O Docker Compose é responsável por definir e executar os serviços do projeto.

O GitHub Actions é utilizado para realizar a integração contínua do projeto, executando automaticamente as etapas de validação, build, inicialização dos containers e teste da aplicação.

---

## 2. Componentes da Arquitetura

O projeto é composto pelos seguintes componentes:

```text
devops-portfolio
│
├── Aplicação Node.js
│   └── Container Docker
│
├── PostgreSQL
│   └── Container Docker
│
├── Docker Compose
│   └── Orquestração dos serviços
│
├── Git
│   └── Controle de versão
│
├── GitHub
│   └── Repositório remoto
│
└── GitHub Actions
    └── Pipeline de integração contínua
```

---

## 3. Aplicação

A aplicação é desenvolvida em Node.js.

Os arquivos da aplicação estão localizados no diretório:

```text
app/
├── app.js
├── Dockerfile
└── package.json
```

O arquivo `app.js` contém o código principal da aplicação.

O `package.json` contém as configurações e dependências necessárias para execução.

O `Dockerfile` define como a imagem da aplicação será construída.

---

## 4. Container da Aplicação

A aplicação é executada dentro de um container Docker.

O serviço é definido no arquivo:

```text
docker-compose.yml
```

Configurações principais:

```text
Nome do container: devops_portfolio_app
Porta: 3000
```

A porta `3000` do container é disponibilizada na porta `3000` da máquina local.

A aplicação pode ser acessada através de:

```bash
curl http://localhost:3000
```

---

## 5. Banco de Dados PostgreSQL

O projeto possui um serviço PostgreSQL utilizando a imagem:

```text
postgres:15-alpine
```

O serviço é definido no Docker Compose com as seguintes configurações:

```text
Database: devops_db
User: postgres
Porta interna: 5432
```

A porta externa utilizada no ambiente local é:

```text
5433
```

A utilização da porta externa `5433` evita conflito com outro serviço PostgreSQL que possa estar utilizando a porta `5432` na máquina.

---

## 6. Comunicação entre os Containers

Os containers da aplicação e do banco de dados estão conectados à mesma rede Docker:

```text
rede_integrada
```

A aplicação acessa o banco utilizando o nome do serviço definido no Docker Compose:

```text
DB_HOST=db
```

A porta utilizada para comunicação interna entre os containers é:

```text
DB_PORT=5432
```

A comunicação ocorre diretamente pela rede Docker.

O endereço `localhost` não é utilizado pela aplicação para localizar o banco de dados.

---

## 7. Rede Docker

A rede utilizada pelo projeto é:

```text
rede_integrada
```

Essa rede permite que os serviços definidos no Docker Compose se comuniquem entre si.

A arquitetura pode ser representada da seguinte forma:

```text
                    rede_integrada
                         |
              +----------+----------+
              |                     |
              v                     v
       +-------------+       +-------------+
       |     app     |       |     db      |
       |   Node.js   | ----> | PostgreSQL  |
       |    :3000    |       |    :5432    |
       +-------------+       +-------------+
              |
              v
        Porta local 3000
```

---

## 8. Persistência dos Dados

O PostgreSQL utiliza um volume Docker chamado:

```text
pgdata
```

O volume é montado no container em:

```text
/var/lib/postgresql/data
```

A utilização do volume permite manter os dados do PostgreSQL separados do ciclo de vida do container.

A configuração utilizada é:

```yaml
volumes:
  pgdata:
    driver: local
```

O comando:

```bash
docker compose down
```

remove os containers, mas não remove automaticamente o volume.

Para remover também o volume seria necessário utilizar:

```bash
docker compose down -v
```

Esse comando deve ser utilizado com atenção, pois remove os volumes associados ao projeto.

---

## 9. Docker Compose

O Docker Compose é responsável pela definição dos serviços da aplicação.

Os principais serviços são:

```text
app
db
```

O serviço `app` representa a aplicação Node.js.

O serviço `db` representa o PostgreSQL.

O Docker Compose também define:

* rede dos serviços;
* portas;
* variáveis de ambiente;
* volume do PostgreSQL;
* dependência entre os serviços;
* configuração de execução dos containers.

---

## 10. Fluxo de Execução Local

O fluxo para executar o projeto localmente é:

```text
docker compose build
        |
        v
Construção da imagem
        |
        v
docker compose up -d
        |
        v
Criação dos containers
        |
        +----------------------+
        |                      |
        v                      v
      app                    db
    Node.js               PostgreSQL
        |                      |
        +----------+-----------+
                   |
                   v
             rede_integrada
                   |
                   v
             Aplicação
             localhost:3000
```

---

## 11. Pipeline de Integração Contínua

O projeto utiliza GitHub Actions para executar o pipeline de CI.

O workflow está localizado em:

```text
.github/workflows/ci.yml
```

O pipeline é executado em eventos de:

```text
push para develop
push para main
Pull Request para develop
Pull Request para main
```

---

## 12. Etapas do Pipeline

O pipeline executa as seguintes etapas:

```text
GitHub
   |
   v
Checkout
   |
   v
Validação do Docker Compose
   |
   v
Build da aplicação
   |
   v
Inicialização dos containers
   |
   v
Verificação dos containers
   |
   v
Teste da aplicação
   |
   v
Finalização do ambiente
```

### Checkout

O código do repositório é disponibilizado no ambiente do GitHub Actions.

### Validação

O comando:

```bash
docker compose config
```

é utilizado para validar a configuração do Docker Compose.

### Build

O comando:

```bash
docker compose build
```

constrói a imagem da aplicação.

### Inicialização

O comando:

```bash
docker compose up -d
```

inicia os serviços.

### Verificação

O comando:

```bash
docker compose ps
```

permite verificar o estado dos containers.

### Teste

O comando:

```bash
curl --fail http://localhost:3000
```

verifica se a aplicação está respondendo corretamente.

### Finalização

Ao final da execução, o pipeline executa:

```bash
docker compose down
```

para remover os containers utilizados durante o teste.

---

## 13. Controle de Versão

O Git é utilizado para controlar as versões do projeto.

O código é desenvolvido localmente e posteriormente enviado para o GitHub.

Fluxo utilizado:

```text
Alteração
   |
   v
git add
   |
   v
git commit
   |
   v
git push
   |
   v
GitHub
```

O GitHub funciona como repositório remoto do projeto.

---

## 14. Estrutura Final

A estrutura esperada do projeto é:

```text
devops-portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml
├── app/
│   ├── app.js
│   ├── Dockerfile
│   └── package.json
├── docs/
│   └── arquitetura.md
├── docker-compose.yml
└── README.md
```

---

## 15. Relação com a Trilha DevOps

A arquitetura integra conhecimentos desenvolvidos durante as semanas anteriores da trilha.

```text
Semana 1
Linux e Terminal
        |
        v
Semana 2
Git e Branches
        |
        v
Semana 3
Docker
        |
        v
Semana 4
CI
        |
        v
Semana 5
Terraform e IaC
        |
        v
Semana 6
Logs e Monitoramento
        |
        v
Semana 7
Projeto Integrado
        |
        v
Semana 8
DevOps Portfolio
```

A Semana 8 reúne principalmente os conceitos de Git, Docker, Docker Compose, CI e documentação em um único projeto.

---

## 16. Resultado da Arquitetura

A arquitetura final permite:

* executar a aplicação em container;
* executar o PostgreSQL em container separado;
* conectar os serviços através de uma rede Docker;
* utilizar volume para persistência do PostgreSQL;
* validar a configuração com Docker Compose;
* executar o build da aplicação automaticamente no pipeline de CI;
* executar testes básicos através do GitHub Actions;
* controlar versões utilizando Git;
* armazenar o projeto em um repositório GitHub.

O projeto demonstra um fluxo básico de integração contínua utilizando ferramentas estudadas durante a Trilha DevOps Júnior NTT Data.
