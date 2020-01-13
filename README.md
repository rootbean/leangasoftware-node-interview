# API Leangasoftware Node Interview #

## Instalación

Run `npm i`

## Configuración y requerimientos

- Install NVM and use version 9 of NodeJS.
- Install ESLint globally `npm i -g eslint`
- To have MongoDB.

## Ejecutar proyecto
Run npm run start:local

## Datos generales

- El archivo actualizado para cargar los eventos de los inmuebles se encuentra en la raíz del proyecto (resource_accommodation.csv)

- LOs archivos (CSV y PDF) generados se guardan en la carpeta test-file

- La documentación del API (en local) se encuentra en http://localhost:3001/api/v1/documentation

- La documentación del API (en producción) se encuentra en https://node-interview-ruber.appspot.com/api/v1/documentation

- La base de datos Mongo, se encuentra en Cloud Mongo y es para realizar los test desde local.

- Se realizó deploy en Google Cloud, pero algunas funcionalidades solo serviran en local como leer el archivo y generar el archivo pdf o csv.
