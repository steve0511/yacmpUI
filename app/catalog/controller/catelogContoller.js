/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('CatalogController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout', 'ngDialog', '$route', '$location',

        function ($scope, DataService, UtilService, $routeParams, $timeout, ngDialog, $route, $location) {

            $scope.totalCount = 0;

            $scope.userItems = [];

            $scope.errorMessage = null;

            $scope.table_columns = ['name', 'description', 'status', 'action'];

            $scope.itemsByPage = CONSTANTS.DEFAULT_PAGE_LIMIT;

            $scope.nextPageLink = null;

            $scope.prevPageLink = null;

            $scope.query = function (pageLink) {
                $scope.catalogs = [];
                DataService.get(pageLink).success(function (data) {
                    var documentLinks = data.results.documentLinks;
                    var documentObjs = data.results.documents;

                    for (var index in documentLinks) {
                        var linkString = documentLinks[index];

                        var document = documentObjs[linkString];

                        var item = {};

                        item["id"] = UtilService.getDocumentLinkId(linkString);
                        item["name"] = document.name;
                        item["description"] = document.description;
                        item["status"] = document.status;
                        item["blueprintLink"] = document.blueprintLink;

                        $scope.catalogs.push(item);
                    }

                    $scope.prevPageLink = data.results.prevPageLink;
                    $scope.nextPageLink = data.results.nextPageLink;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of catalogs, error # " + status;
                });
            }

            var query_spec_total = DataService.querySpecTotalDocument(CONSTANTS.SERVICE_CATALOG.DOCUMENTKIND);
            var query_spec = DataService.querySpec(CONSTANTS.SERVICE_CATALOG.DOCUMENTKIND, CONSTANTS.DEFAULT_PAGE_LIMIT);

            $scope.load_data = function (tableState) {
                $scope.isLoading = true;
                var pagination = tableState.pagination;
                //Current Xenon doesn't support start index
                //var start = pagination.start || 0;
                var number = pagination.number || $scope.itemsByPage;

                // Get the Total count for Query Service
                DataService.post(CONSTANTS.SERVICE_QUERY.PATH, query_spec_total).success(function (data) {
                    $scope.totalCount = data.results.documentCount;
                    tableState.pagination.numberOfPages = data.results.documentCount / number;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of catalogs, error # " + status;
                });

                // Get first blueprint document
                DataService.post(CONSTANTS.SERVICE_QUERY.PATH, query_spec).success(function (data, status) {
                    console.log("request status: " + status);

                    $scope.nextPageLink = data.results.nextPageLink;
                    console.log("next page link: " + $scope.nextPageLink)

                    if (typeof $scope.nextPageLink !== "undefined" && $scope.nextPageLink !== null) {
                        $scope.query($scope.nextPageLink)
                    }

                    $scope.isLoading = false;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of catalogs, error # " + status;
                });
            };


            $scope.view = function (id) {
                $location.path('/catalog/' + id);
            };

            $scope.delete = function (id) {
                ngDialog.openConfirm({
                    template:
                    '<div class="box-body"><p>Are you sure you want to delete?</p><div>' +
                    '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes</button>&nbsp;&nbsp;&nbsp;&nbsp'+
                    '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No</button></div>' +
                    '</div>',
                    plain: true,
                    className: 'ngdialog-theme-default'
                }).then(function (confirm) {
                    DataService.deleteDocument(CONSTANTS.SERVICE_CATALOG.PATH+"/"+id).success(function (data, status) {
                        $route.reload();
                    }).error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't delete catalog, error # " + status;
                    });
                }, function (reject) {
                });
            };

            $scope.getPage = function (pageUrl) {
                $scope.query(pageUrl);
            };

            $scope.openRequest = function (id, blueprintLink){
                ngDialog.open({
                    template: 'catalog/partial/catalog_request.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope,
                    controller: ['$scope', function($scope) {
                        $scope.results = {};
                        $scope.inputFormats = [];
                        DataService.get(blueprintLink + "?action=getInputFormat").success(function (data) {
                            $scope.inputFormats = data;
                        });
                        $scope.submitRequest = function (){
                            $scope.requesting = true;
                            var requestData = {
                                "count" : 1,
                                "reason" : "request a vm for development",
                                "paramJson" : JSON.stringify($scope.results),
                                "kind" : "PROVISION"
                            };
                            DataService.patch(CONSTANTS.SERVICE_CATALOG.PATH+"/"+id,requestData).success(function (data, status) {
                                $scope.requesting = false ;
                                ngDialog.close();
                                $route.reload();

                            }).error(function (data, status, headers, config) {
                                $scope.requesting = false ;
                                $scope.errorMessage = "Failed to request catalog, error status code is# " + status;
                            });
                        }
                    }]
                });
            };
        }
    ]
);
