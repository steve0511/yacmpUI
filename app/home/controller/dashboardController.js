/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('DashboardController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, DataService, UtilService, $routeParams, $timeout) {
                console.log("DashboardController")

                $scope.allEntries = [
                        { name: 'Overview',  url:  CONSTANTS.UI_RESOURCES + 'home/partial/dashboard_overview.html'},
                        { name: 'Reports',   url:  CONSTANTS.UI_RESOURCES + 'home/partial/dashboard_reports.html'},
                        { name: 'Analytics', url:  CONSTANTS.UI_RESOURCES + 'home/partial/dashboard_reports.html'},
                        { name: 'Export',    url:  CONSTANTS.UI_RESOURCES + 'home/partial/dashboard_reports.html'}
                    ];

                $scope.templateUrl = $scope.allEntries[0].url;

                $scope.changeTemplate = function(val){
                    $scope.templateUrl = val.url
                };

            }
        ]
);
