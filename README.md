<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# Run on Develop environment

1. Clone repository
2. Run 
```
$ yarn install
```
3. Nest CLI installed
```
$ npm i -g @nestjs/cli
```
4. Up Database
```
$ docker-compose up -d
```
5. Clone __.env.template__ and rename copy to __.env__

6. Complete the variables environment defined

7. Run command
```
$ yarn start:dev
```

6. Load DataBase
```
$ http://localhost:3000/api/v2/seed
```

# Build for production
1. Create the ```.env.prod``` file
2. Set environment variables of production
3. Build the image with 
```
$ docker-compose -f docker-compose.prod.yaml --env-file .env.prod --build
```
4. Run image
```
$ docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

##NOTAS
Para utilizar los .env instalar yarn add @nestjs/config
paquetes instalados "joi" para hacer validaciones