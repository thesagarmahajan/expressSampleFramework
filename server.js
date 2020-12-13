const express = require('express');
const loadViewApp = express();
const apiApp = express();
const view = require('./loadView');
const api = require('./api');
const viewPort = 5050;
const apiPort = 8808;

api.api(apiApp, apiPort);
view.loadView(loadViewApp, viewPort, apiPort);






