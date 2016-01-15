/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('CatalogDetailController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, DataService, UtilService, $routeParams, $timeout) {

            var id = $routeParams.id;

            DataService.get(CONSTANTS.SERVICE_CATALOG.PATH+"/"+id).success(function(data, status){
                $scope.catalog = data;
            }).error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the catalog, error # " + status;
            });

        }
    ]
);
