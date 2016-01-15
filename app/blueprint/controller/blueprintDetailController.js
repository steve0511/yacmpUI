/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('BluePrintDetailController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, DataService, UtilService, $routeParams, $timeout) {

            var id = $routeParams.id;

            DataService.get(CONSTANTS.SERVICE_BLUEPRINT.PATH+"/"+id).success(function(data, status){
                $scope.blueprint = data;
            }).error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the blueprint, error # " + status;
            });

        }
    ]
);
