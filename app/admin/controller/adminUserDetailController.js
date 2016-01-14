/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('AdminUserDetailController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, DataService, UtilService, $routeParams, $timeout) {

            var name = $routeParams.name;

            DataService.get(CONSTANTS.SERVICE_USER.PATH+"/"+name).success(function(data, status){
                $scope.user = data;
            }).error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the user, error # " + status;
            });

        }
    ]
);
