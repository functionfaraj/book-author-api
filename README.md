# To run app npm i, npm start 
# Structuer
├── src
│   ├── db 
│   │  ├── schemas
│   │     ├── shemaName.js
│   │  ├── plugins
│   │     ├── pluginName.js
│   │  ├── connectiom.js // ceonnect to mongodb
│   ├── routes 
│   │  ├── routeName
│   │     ├── tests
│   │        ├── routeSpec.js
│   │     ├── router.js
│   │     ├── controller.js
│   │     ├── services.js
│   ├── services 
│   │  ├── serviceName.js
│   ├── utils 
│   │  ├── utilName.js
│   ├── index.js // server
│   ├── app.js // give server node-express framework and set the setting we need