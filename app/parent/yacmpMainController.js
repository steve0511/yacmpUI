/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('YacmpMainController', ['$scope', '$routeParams', 'UtilService',

        function ($scope, $routeParams, UtilService) {
            $scope.$on('$routeChangeSuccess', function () {
                $scope.path= $routeParams.path;
                $scope.service = $routeParams.serviceName;
                $scope.instance = $routeParams.instanceId;
                $scope.baseUrl = UtilService.getBaseUrl();
                $scope.uiBase = CONSTANTS.UI_CUSTOM_BASE;
                $scope.notification = {};
            });
        }]
);
