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
        when("/home", {
            templateUrl: 'home/partial/dashboard.html'
        }).
        when("/catalog", {
            templateUrl: 'catalog/partial/catalog.html',
        }).
        when("/deployment", {
            templateUrl: 'deployment/partial/deployment.html'
        }).
        when("/admin/users", {
            templateUrl: 'admin/partial/admin_users_list.html',
            controller: "AdminController"
        }).
        when('/admin/user/:name', {
            templateUrl: CONSTANTS.PAGE_RESOUCES + 'admin/partial/admin.html',
            controller: "AdminDetailController"
        }).
        otherwise({
            redirectTo: '/'
        });

}]).config(['$httpProvider', function($httpProvider, $cookieStore) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);