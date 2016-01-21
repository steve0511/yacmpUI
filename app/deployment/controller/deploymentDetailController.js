/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('DeploymentDetailController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, DataService, UtilService, $routeParams, $timeout) {

            var spec = {
                "kind": "com:vmware:yacmp:core:deployment:RefreshDeploymentDetailRequest"
            };

            var id = $routeParams.id;

            $scope.activeTab = 1;

            $scope.setActiveTab = function(tabToSet) {
                $scope.activeTab = tabToSet;
            }

            DataService.patch(CONSTANTS.SERVICE_DEPLOYMENT.PATH+"/"+id, spec).success(function (data) {
                var detail = data.targetDetails;
                var detailObj = JSON.parse(detail);
                $scope.detail = detailObj;
            }).error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the detail and operation of deployments, error # " + status;
            });

        }
    ]
);
