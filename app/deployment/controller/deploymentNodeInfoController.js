/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */
/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('DeploymentNodeInfoController', ['$scope', 'DataService', 'UtilService',
    '$routeParams', '$timeout','ngDialog','$rootScope',
        function ($scope, DataService, UtilService, $routeParams, $timeout, ngDialog, $rootScope) {

            $scope.table_columns = ['key', 'value'];

            var id = $routeParams.id;

            $scope.activeTab = 1;

            $scope.setActiveTab = function(tabToSet) {
                $scope.activeTab = tabToSet;
            }

            $scope.nodeinfo = $rootScope.node;

            console.log($scope.nodeinfo);



        }
    ]
);