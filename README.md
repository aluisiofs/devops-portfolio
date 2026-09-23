# DevOps Portfolio

Projeto final desenvolvido na Semana 8 da Trilha DevOps Júnior NTT Data.

O objetivo deste projeto é reunir, em uma aplicação simples, os principais conceitos estudados durante a trilha, demonstrando um fluxo básico de DevOps utilizando Docker, Docker Compose, Git, GitHub e GitHub Actions.

O projeto utiliza uma aplicação Node.js executada em container e um banco de dados PostgreSQL também executado em container.

---

## 1. Objetivo do Projeto

O objetivo da Semana 8 é desenvolver uma aplicação simples que utilize:

* Docker;
* Pipeline de CI;
* Documentação;
* Git e GitHub;
* Automação do processo de validação e teste.

A proposta é demonstrar o fluxo completo desde o envio do código até a execução automatizada dos testes.

Fluxo utilizado:

```text
Desenvolvedor
      |
      v
Git
      |
      v
GitHub
      |
      v
GitHub Actions
      |
      +--> Checkout do código
      |
      +--> Validação do Docker Compose
      |
      +--> Build da aplicação
      |
      +--> Inicialização dos containers
      |
      +--> Verificação dos containers
      |
      +--> Teste da aplicação
      |
      +--> Finalização do ambiente
```

---

## 2. Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias:

| Tecnologia     | Utilização                   |
| -------------- | ---------------------------- |
| Linux          | Ambiente de desenvolvimento  |
| Git            | Controle de versão           |
| GitHub         | Hospedagem do código         |
| Node.js        | Execução da aplicação        |
| Docker         | Containerização da aplicação |
| Docker Compose | Orquestração dos containers  |
| PostgreSQL     | Banco de dados               |
| GitHub Actions | Automação do pipeline de CI  |

---

## 3. Estrutura do Projeto

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

### Diretórios e arquivos

#### `.github/workflows/`

Contém o workflow utilizado pelo GitHub Actions.

```text
.github/workflows/ci.yml
```

Esse arquivo define as etapas executadas automaticamente pelo pipeline.

#### `app/`

Contém os arquivos da aplicação Node.js.

```text
app/
├── app.js
├── Dockerfile
└── package.json
```

#### `docs/`

Contém a documentação complementar do projeto.

```text
docs/arquitetura.md
```

#### `docker-compose.yml`

Define os serviços utilizados pelo projeto, incluindo a aplicação e o PostgreSQL.

#### `README.md`

Contém a documentação principal do projeto, instruções de execução e explicação das decisões técnicas.

---

## 4. Aplicação

A aplicação utilizada no projeto é uma aplicação simples desenvolvida em Node.js.

O código principal está localizado em:

```text
app/app.js
```

O arquivo `package.json` contém as configurações e dependências necessárias para execução da aplicação.

A aplicação é executada dentro de um container Docker.

---

## 5. Containerização com Docker

O projeto utiliza um `Dockerfile` para criar a imagem da aplicação.

Arquivo:

```text
app/Dockerfile
```

O Docker permite que a aplicação seja executada em um ambiente isolado e padronizado.

Isso reduz diferenças entre ambientes de desenvolvimento e execução.

Para construir a imagem:

```bash
docker compose build
```

---

## 6. Docker Compose

O Docker Compose é utilizado para executar os serviços necessários para o projeto.

O arquivo:

```text
docker-compose.yml
```

define dois serviços principais:

```text
app
db
```

### Serviço app

O serviço `app` executa a aplicação Node.js.

Configurações principais:

```text
Porta: 3000
NODE_ENV: development
DB_HOST: db
DB_PORT: 5432
DB_NAME: devops_db
DB_USER: postgres
```

### Serviço db

O serviço `db` utiliza a imagem:

```text
postgres:15-alpine
```

O banco utiliza:

```text
Database: devops_db
User: postgres
```

A porta PostgreSQL utilizada dentro da rede Docker permanece:

```text
5432
```

No ambiente local, a porta externa utilizada é:

```text
5433
```

Isso evita conflito com outro PostgreSQL executado na máquina.

---

## 7. Comunicação entre os Containers

Os serviços `app` e `db` estão conectados à mesma rede Docker:

```text
rede_integrada
```

A aplicação não precisa utilizar `localhost` para acessar o banco.

Ela utiliza o nome do serviço Docker:

```text
DB_HOST=db
```

e a porta interna:

```text
DB_PORT=5432
```

Dessa forma, o Docker resolve o nome `db` para o container do PostgreSQL dentro da rede.

---

## 8. Volume do PostgreSQL

O projeto utiliza um volume Docker chamado:

```text
pgdata
```

O volume é utilizado para armazenar os dados do PostgreSQL fora do sistema de arquivos temporário do container.

Configuração:

```yaml
volumes:
  pgdata:
    driver: local
```

O volume é montado no PostgreSQL em:

```text
/var/lib/postgresql/data
```

---

## 9. Como Executar o Projeto Localmente

### Pré-requisitos

É necessário possuir:

* Docker instalado;
* Docker Compose V2 instalado;
* Git instalado.

Verificar Docker:

```bash
docker --version
```

Verificar Docker Compose:

```bash
docker compose version
```

---

## 10. Construir o Projeto

Dentro do diretório `devops-portfolio`:

```bash
docker compose build
```

Esse comando constrói a imagem da aplicação utilizando o `Dockerfile`.

---

## 11. Iniciar os Containers

Para iniciar os serviços:

```bash
docker compose up -d
```

O parâmetro `-d` executa os containers em segundo plano.

---

## 12. Verificar os Containers

Para verificar o estado dos serviços:

```bash
docker compose ps
```

Os serviços esperados são:

```text
devops_portfolio_app
devops_portfolio_db
```

A aplicação deve estar disponível na porta:

```text
3000
```

O PostgreSQL é disponibilizado localmente na porta:

```text
5433
```

---

## 13. Testar a Aplicação

A aplicação pode ser testada localmente com:

```bash
curl http://localhost:3000
```

O comando verifica se a aplicação está respondendo corretamente.

---

## 14. Visualizar os Logs

Para visualizar os logs da aplicação:

```bash
docker compose logs -f app
```

Para visualizar os logs do PostgreSQL:

```bash
docker compose logs -f db
```

---

## 15. Parar o Projeto

Para parar e remover os containers:

```bash
docker compose down
```

O volume do PostgreSQL não é removido automaticamente pelo comando acima.

Para remover também os volumes do projeto, seria necessário utilizar:

```bash
docker compose down -v
```

Esse comando deve ser utilizado com atenção, pois remove os volumes associados ao projeto.

---

# 16. Pipeline de CI

O projeto utiliza GitHub Actions para automatizar a validação do código.

O workflow está localizado em:

```text
.github/workflows/ci.yml
```

O pipeline é executado quando ocorre:

* `push` na branch `develop`;
* `push` na branch `main`;
* Pull Request para `develop`;
* Pull Request para `main`.

---

## 17. Etapas do Pipeline

O pipeline executa as seguintes etapas.

### 17.1 Checkout

O GitHub Actions utiliza:

```yaml
uses: actions/checkout@v4
```

Essa etapa baixa o código do repositório para o ambiente de execução do GitHub Actions.

### 17.2 Validação do Docker Compose

O pipeline executa:

```bash
docker compose config
```

Essa etapa verifica se o arquivo `docker-compose.yml` possui uma configuração válida.

### 17.3 Build

O pipeline executa:

```bash
docker compose build
```

Essa etapa verifica se a imagem da aplicação pode ser construída corretamente.

### 17.4 Inicialização

O pipeline executa:

```bash
docker compose up -d
```

Essa etapa inicia os serviços da aplicação e do banco de dados.

### 17.5 Verificação

O pipeline executa:

```bash
docker compose ps
```

Essa etapa permite verificar o estado dos containers.

### 17.6 Teste da aplicação

O pipeline executa:

```bash
curl --fail http://localhost:3000
```

O parâmetro `--fail` faz com que o comando retorne erro caso a aplicação não responda corretamente.

### 17.7 Finalização

Independentemente do resultado das etapas anteriores, o pipeline executa:

```bash
docker compose down
```

Isso permite limpar o ambiente utilizado durante a execução do pipeline.

---

# 18. Workflow de CI

O workflow completo utilizado pelo projeto é:

```yaml
name: CI - DevOps Portfolio

on:
  push:
    branches:
      - "develop"
      - "main"
  pull_request:
    branches:
      - "develop"
      - "main"

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Validar Docker Compose
        run: |
          docker compose config

      - name: Build da aplicação
        run: |
          docker compose build

      - name: Subir containers
        run: |
          docker compose up -d

      - name: Verificar containers
        run: |
          docker compose ps

      - name: Testar aplicação
        run: |
          curl --fail http://localhost:3000

      - name: Finalizar ambiente
        if: always()
        run: |
          docker compose down
```

---

# 19. Fluxo Completo do Projeto

O fluxo de trabalho desenvolvido na Semana 8 pode ser representado da seguinte maneira:

```text
Alteração no código
        |
        v
Git
        |
        v
git push
        |
        v
GitHub
        |
        v
GitHub Actions
        |
        +--> Checkout
        |
        +--> docker compose config
        |
        +--> docker compose build
        |
        +--> docker compose up
        |
        +--> docker compose ps
        |
        +--> curl localhost:3000
        |
        +--> docker compose down
        |
        v
Resultado do Pipeline
```

---

# 20. Decisões Técnicas

## Docker

O Docker foi utilizado para criar um ambiente padronizado para execução da aplicação.

A containerização facilita a reprodução do ambiente e reduz problemas relacionados às diferenças entre máquinas.

## Docker Compose

O Docker Compose foi escolhido para facilitar a execução conjunta da aplicação e do banco de dados.

## PostgreSQL

O PostgreSQL foi utilizado como banco de dados relacional do projeto.

## GitHub Actions

O GitHub Actions foi utilizado para automatizar o processo de integração contínua.

Dessa forma, alterações enviadas para o GitHub podem ser automaticamente validadas.

## Git

O Git foi utilizado para controle de versão.

O fluxo utilizado durante a trilha trabalha com as branches:

```text
develop
main
```

A branch `develop` é utilizada para desenvolvimento e a `main` representa a versão principal do projeto.

## Documentação

A documentação foi criada para explicar:

* objetivo do projeto;
* tecnologias utilizadas;
* arquitetura;
* execução local;
* Docker;
* Docker Compose;
* CI;
* estrutura do projeto;
* decisões técnicas.

---

# 21. Relação com as Semanas Anteriores

O projeto final aproveita conhecimentos desenvolvidos durante as semanas anteriores da trilha.

### Semana 1

Fundamentos de Linux e utilização do terminal.

### Semana 2

Git, branches, GitFlow e resolução de conflitos.

### Semana 3

Criação e execução de containers Docker.

### Semana 4

Criação de pipelines utilizando GitHub Actions.

### Semana 5

Conceitos de Infrastructure as Code utilizando Terraform.

### Semana 6

Logs, métricas e conceitos básicos de monitoramento.

### Semana 7

Integração de aplicação containerizada com Docker Compose e pipeline de CI.

### Semana 8

Integração dos principais conceitos em um projeto final de portfólio utilizando Docker, CI e documentação.

---

# 22. Resultado Final

Ao final da Semana 8, o projeto possui:

* aplicação Node.js;
* Dockerfile;
* Docker Compose;
* PostgreSQL;
* rede Docker;
* volume persistente;
* pipeline de CI com GitHub Actions;
* testes automatizados básicos;
* documentação do projeto;
* estrutura organizada para apresentação em portfólio.

O projeto demonstra um fluxo básico de DevOps:

```text
Código
  |
  v
Git
  |
  v
GitHub
  |
  v
GitHub Actions
  |
  v
Docker
  |
  v
Aplicação + PostgreSQL
  |
  v
Teste automatizado
```

Este repositório representa a entrega final da Semana 8 da Trilha DevOps Júnior NTT Data.
