/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('CatalogController', ['$scope', 'UtilService',
        '$routeParams', '$timeout',

        function ($scope, $routeParams, $timeout) {

            $scope.allEntries = [
                { name: 'Catalog Management', url:  CONSTANTS.PAGE_RESOUCES + 'catalog/partial/catalog_list.html'},
            ];

            $scope.templateUrl = $scope.allEntries[0].url;

            $scope.selectedNavItem = $scope.allEntries[0].name

            $scope.changeTemplate = function(val){
                $scope.templateUrl = val.url
                $scope.selectedNavItem = val.name
            };

        }
    ]
);