/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('AdminUserDetailController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, DataService, UtilService, $routeParams, $timeout) {
            console.log("AdminController")

            $scope.childs = [
                { name: 'Users',       url:  CONSTANTS.UI_RESOURCES +  'admin/partial/admin_users_list.html'},
                { name: 'Groups',      url:  CONSTANTS.UI_RESOURCES +  'admin/partial/admin_groups.html'},
                { name: 'Resource',    url:  CONSTANTS.UI_RESOURCES +  'admin/partial/admin_resources.html'},
                { name: 'Entitlement', url:  CONSTANTS.UI_RESOURCES +  'admin/partial/admin_entitlement.html'}
            ];

            $scope.selectedChildName = $scope.childs[0].name;

            $scope.selectedChildUrl = CONSTANTS.UI_RESOURCES +  'admin/partial/admin_user_detail.html';

            $scope.changeTemplate = function(val){
                $scope.selectedChildUrl = val.url;
                $scope.selectedChildName = val.name;
            };

        }
    ]
);
