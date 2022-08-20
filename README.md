
<p align="center">
  <a href="http://www.ifto.edu.br/paraiso">
    <img src="http://www.ifto.edu.br/paraiso/logo-home-campus-paraiso.png/@@images/07619964-1389-4188-91c0-c0f38508b3d4.png" alt="IFTO Paraíso">
  </a>
</p>

## MatchPlayer - Aplicativo para encontros esportivos

Trabalho de Conclusão de Curso apresentado à Coordenação do Curso de Bacharelado em Sistemas de Informação, do Campus Paraíso do Tocantins do Instituto Federal do Tocantins, como exigência à obtenção do título de Bacharel(a) em Sistemas de Informação.

Construído de forma simples apenas para atender os requisitos e concluir o curso, o MatchPlayer foi construído utilizando a linguagem *TypeScript* e tecnologias recentes e usuais no mercado.

## Install

Start App:

```bash
npm install --global expo-cli
cd app
expo start 
```

Start backend (create database and configure .env):

```bash
PORT=8001

DB_DIALECT=mysql
DB_HOST=localhost
DB_USER=root
DB_NAME=matchplayer
DB_PASS=1234
```

```bash
cd backend
npm install
npx sequelize db:migrate
npx sequelize db:seed:all
npm start
```



## Tecnologias


<a href="https://docs.expo.dev/">
    <img width="96" src="https://miro.medium.com/max/512/1*3o8TOSojT64ChGpjop0USA.png" alt="expo">
  </a>
<a href="https://sequelize.org/">
    <img width="96" src="https://sequelize.org/img/logo.svg" alt="sequelize">
  </a>
<a href="https://expressjs.com/pt-br/">
    <img width="96" src="https://camo.githubusercontent.com/0566752248b4b31b2c4bdc583404e41066bd0b6726f310b73e1140deefcc31ac/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67" alt="express">
  </a>
<a href="https://nodejs.org/en/">
    <img width="96" src="https://nodejs.org/static/images/logo.svg" alt="NodeJS">
  </a>
<a href="https://reactnative.dev/">
    <img width="96" src="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg" alt="React Native">
  </a>

---

  *Esse aplicativo foi construído porém, ainda não está exatamente como eu planejei inicialmente, pois para concluir o curso a tempo tive que lidar com o desenvolvimento do app e com a construção da monografia, então por isso tive que fazer da forma mais simples e funcional possível. Ainda não tive tempo para deixar exatamente como quero. Atualmente estou trabalhando e com outro projeto nas costas, mas quem sabe eu volte de onde parei.*