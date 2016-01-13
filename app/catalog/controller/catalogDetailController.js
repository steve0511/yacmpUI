/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */
angular.module('yacmpApp').controller('CatalogDetailCtrl', ['$scope', 'UtilService',
        '$routeParams', '$timeout', '$route',

        function ($scope, UtilService, $routeParams, $timeout,  $route) {

            console.log($routeParams.name);

            $scope.allEntries = [
                    { name: 'Catalog Management', url:  CONSTANTS.PAGE_RESOUCES + 'catalog/partial/catalog_list.html'},
            ];

            $scope.templateUrl = "catalog/partial/catalog_dialog.html";

            $scope.selectedNavItem = $scope.allEntries[0].name

            $scope.changeTemplate = function(val){
                    $scope.templateUrl = val.url
                    $scope.selectedNavItem = val.name
            };


        }
    ]
);
