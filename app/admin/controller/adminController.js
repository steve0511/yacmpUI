/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('AdminController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, DataService, UtilService, $routeParams, $timeout) {
            console.log("AdminController")

            $scope.childs = [
                { name: 'Users',       url:  CONSTANTS.PAGE_RESOUCES +  'admin/partial/admin_users.html'},
                { name: 'Groups',      url:  CONSTANTS.PAGE_RESOUCES +  'admin/partial/admin_groups.html'},
                { name: 'Resource',    url:  CONSTANTS.PAGE_RESOUCES +  'admin/partial/admin_resources.html'},
                { name: 'Entitlement', url:  CONSTANTS.PAGE_RESOUCES +  'admin/partial/admin_entitlement.html'}
            ];

            $scope.selectedChildName = $scope.childs[0].name;

            $scope.selectedChildUrl = $scope.childs[0].url;

            $scope.changeTemplate = function(val){
                $scope.selectedChildUrl = val.url;
                $scope.selectedChildName = val.name;
            };

        }
    ]
);
