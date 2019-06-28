# Alexa Jenkins Deployer

Essa é um deployer simples utilizando Alexa como `trigger` para as chamadas de deploy.

Esse projeto é apenas uma prova de conceito e sua base de codigo fica a desejar em varios aspectos.

## Jenkins + buildWithParameters

Todo o deploy se baseia na capacidade do Jenkins fazer um deploy recebendo parametros de forma programatica via URL.

Detalhes podem ser encontrados aqui: https://wiki.jenkins.io/display/JENKINS/Parameterized+Build

Se o jenkins esta em uma VPC vode pode deployar o lambda na mesma VPC para garantir a conetividade e manter a segurança.

A skill irá passar os seguintes atributos pela URL:

* job: nome do job
* token: token gerado pelo jenkins que serve como chave
* branch: id do branch
* type: tipo de deploy
* env: ambiente

## Skill

A skill irá fazer chamadas para o jenkins passando alguns parametros, esses parametros são:

* TYPE: tipo do deploy (basico, medio, completo)
* ENV: ambiente onde o deploy ira acontecer (dev, qa, prod)
* STORY_ID: numero que identifica o branch a ser deployado
