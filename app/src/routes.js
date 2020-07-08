const express = require('express');
const LocatorController = require('./controllers/LocatorController');
const TenantController = require('./controllers/TenantController');
const UserController = require('./controllers/UserController');
const RealEstateController = require('./controllers/RealEstateController');
const SolicitationController = require('./controllers/SolicitationController');

const routes = express.Router();

// User Routes
routes.post('/User/auth', UserController.auth); //userlogin
routes.get('/User/:id', UserController.findOne); //find use by id

// Locator Routes
routes.post('/Locator', LocatorController.store); //create locator
routes.get('/Locator/:id/RealEstate', LocatorController.findRealEstate); //list realestate by locator
routes.get('/Locator/:id/Solicitation', LocatorController.findSolicitation); //list solicitation by locator

// Tenant Routes
routes.post('/Tenant', TenantController.store); //create tenant
routes.post('/Tenant', TenantController.findSolicitation); //list solicitation by tenant

// RealEstate Routes
routes.post('/RealEstate', RealEstateController.store); //create realEstate
routes.get('/RealEstate', RealEstateController.findAll); //list all realEstate
routes.get('/RealEstate/:id', RealEstateController.findOne); //list specific realEstate

// Solicitation Routes
routes.post('/Solicitation', SolicitationController.store); //create solicitation
routes.post('/Solicitation/Alternative', SolicitationController.storeAlternative); //create solicitation

module.exports = routes;