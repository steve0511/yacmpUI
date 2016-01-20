/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

/* App Module */
var yacmpApp = angular.module('yacmpApp', ['ngRoute', 'ngResource', 'nvd3', 'smart-table', 'lrDragNDrop', 'ngDialog', 'ui.bootstrap']);

yacmpApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl: 'home/partial/dashboard.html'
        }).
        when("/blueprint", {
            templateUrl: 'blueprint/partial/blueprints.html'
        }).
        when("/blueprint/:id", {
            templateUrl: 'blueprint/partial/blueprint_detail.html'
        }).
        when("/createblueprint", {
            templateUrl: 'blueprint/partial/blueprint_add_edit.html',
            controller: 'BluePrintAddController'
        }).
        when("/editblueprint/:id", {
            templateUrl: 'blueprint/partial/blueprint_add_edit.html',
            controller: 'BluePrintEditController'
        }).
        when("/catalog", {
            templateUrl: 'catalog/partial/catalogs.html',
        }).
        when("/catalog/:id", {
            templateUrl: 'catalog/partial/catalog_detail.html',
        }).
        when("/deployment", {
            templateUrl: 'deployment/partial/deployments.html'
        }).
        when("/deployment/:id", {
            templateUrl: 'deployment/partial/deployment_detail.html'
        }).
	    when("/admin/users", {
            templateUrl: 'admin/partial/admin_users.html',
        }).
        when('/admin/user/:name', {
            templateUrl: 'admin/partial/admin_user_details.html'
        }).
        when("/tasks", {
            templateUrl: 'task/partial/tasks.html'
        }).
        when("/task/:id", {
            templateUrl: 'task/partial/task_detail.html'
        }).
        when("/notification", {
            templateUrl: 'notification/partial/notifications.html',
        }).
        otherwise({
            redirectTo: '/'
        });

}]).config(['$httpProvider', function($httpProvider, $cookieStore) {
    //$httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
    //delete $httpProvider.defaults.headers.common["access-control-allow-origin"];
    //delete $httpProvider.defaults.headers.common["access-control-allow-methods"];

}]);
