/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */
angular.module('yacmpApp').factory('Service', function($resource) {
    return $resource('http://localhost:8080/mockdata/api/catalog/page');
});

angular.module('yacmpApp').controller('CatalogListController', ['$scope', 'UtilService',
        '$routeParams', '$timeout','Service', 'ngDialog', '$resource','$http','$route','$location',

        function ($scope, UtilService, $routeParams, $timeout, Service, ngDialog, $resource, $http, $route, $location) {

            console.log($scope.selectedNavItem);

            $scope.itemsByPage = 10;

            $scope.callServer = function(tableState) {

                $scope.isLoading = true;
                var pagination = tableState.pagination;
                var start = pagination.start || 0;
                var number = pagination.number || $scope.itemsByPage;
                Service.get({
                        page : 1+(start/number),
                        size : number
                    },
                    function(pageable) {
                        $scope.pageable = pageable;
                        $scope.items = pageable.content;
                        tableState.pagination.numberOfPages = pageable.totalPages;
                        $scope.isLoading = false;
                    });
            };

            $scope.removeRow = function (dataRow) {
                console.log(dataRow);
            };

            $scope.columns=['name','description', 'createdate','action'];


            $scope.addCatalog = function () {
                ngDialog.open({ template: 'catalog/partial/catalog_add.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            };

            $scope.submit = function (catalog) {
                ngDialog.close();
                console.log(catalog);
                $route.reload();
            }

            $scope.delete = function (catalog) {
                ngDialog.openConfirm({
                    template:
                    '<p>Are you sure you want to delete?</p>' +
                    '<div class="confirm">' +
                    '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' +
                    '</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
                    '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' +
                    '</button></div>',
                    plain: true,
                    className: 'ngdialog-theme-default'
                }).then(function (value) {
                    console.log('confirm');
                }, function(reject) {
                    console.log('reject');
                });
            }

            $scope.view = function (id) {
                $location.path('/catalog/' + id);
            }

        }
    ]
);