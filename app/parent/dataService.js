/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').service('DataService', ['$http', 'UtilService',
    function ($http, UtilService) {

        this.querySpecTotalDocument = function(documentKind){
            var spec = {
                "taskInfo": {
                  "isDirect": true
                 },
                "querySpec": {
                    "query": {
                        "term": {
                            "matchValue": documentKind,
                            "propertyName": "documentKind"
                        }
                    }
                }
            }
            return spec;
        }

        this.querySpec = function(documentKind, numbers){
            var spec = {
                "taskInfo": {
                    "isDirect": true
                },

                "querySpec": {
                     "options": [
                                    "EXPAND_CONTENT"
                         ],
                     "query": {
                         "term": {
                             "matchValue": documentKind,
                             "propertyName": "documentKind"
                         }
                     },
                    "resultLimit": numbers
                }
            }
            return spec;
        }

        this.postServiceInstance = function (path, body) {
            var req = {
                method: 'POST',
                url: UtilService.getBaseUrl() + path,
                headers: {
                    'Content-Type': CONSTANTS.CONTENT_TYPE.JSON
                },
                data: body
            };
            return $http(req, body)
        }

        this.getSystemInfo = function (path) {
            var req = {
                method: 'GET',
                url: UtilService.getBaseUrl() + '/core/management',
                headers: {
                    'Content-Type': CONSTANTS.CONTENT_TYPE.JSON
                }
            };
            return $http(req);
        };

        this.getServicesInstances = function (path) {
            var req = {
                method: 'GET',
                //url: UtilService.getBaseUrl() + '/core/document-index?documentSelfLink=*',
                url: UtilService.getBaseUrl() + path,
                headers: {
                    'Content-Type': CONSTANTS.CONTENT_TYPE.JSON,
                    'Access-Control-Allow-Origin': 'http://127.0.0.1',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Accept'
                }
            };
            return $http(req);
        };

        this.getNodeGroups = function (path) {
            var req = {
                method: 'GET',
                url: UtilService.getBaseUrl() + '/core/node-groups',
                headers: {
                    'Content-Type': CONSTANTS.CONTENT_TYPE.JSON
                }
            };
            return $http(req);
        };

        this.getFactoryServices = function (path) {
            var req = {
                method: 'GET',
                url: UtilService.getBaseUrl() + '/',
                headers: {
                    'Content-Type': CONSTANTS.CONTENT_TYPE.JSON
                }
            };
            return $http(req);
        }


        this.getServiceDocuments = function (path, service) {
            var req = {
                method: 'GET',
                url: UtilService.getBaseUrl() + '/' + path + '/' + service,
                headers: {
                    'Content-Type': CONSTANTS.CONTENT_TYPE.JSON
                }
            };
            return $http(req);
        };

        this.getServiceInstance = function (path, service, instance) {
            var req = {
                method: 'GET',
                url: UtilService.getBaseUrl() + '/' + path + '/' + service + '/' + instance,
                headers: {
                    'Content-Type': CONSTANTS.CONTENT_TYPE.JSON
                }
            };
            return $http(req);
        };


        this.deleteService = function (selflink) {
            var req = {
                method: 'DELETE',
                data: {},
                headers: {
                    'Content-Type': CONSTANTS.CONTENT_TYPE.JSON
                },
                url: UtilService.getBaseUrl() + selflink
            };
            return $http(req);
        };


    }]);