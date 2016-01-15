/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('BluePrintController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, DataService, UtilService, $routeParams, $timeout) {
            console.log("BluePrintController")

            $scope.childs = [
                { name: 'BluePrint Management', url:  CONSTANTS.UI_RESOURCES +  'blueprint/partial/blueprint_list.html'},
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
