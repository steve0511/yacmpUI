/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('AdminUserController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout','$route',

        function ($scope, DataService, UtilService, $routeParams, $timeout, $route) {
            console.log("AdminController")

            $scope.totalCount = 0;

            $scope.userItems = [];

            $scope.errorMessage = null;

            $scope.table_columns=['name', 'email', 'update_date', 'action'];

            $scope.itemsByPage =  CONSTANTS.DEFAULT_PAGE_LIMIT;

            $scope.query_users = function (pageLink) {
                DataService.getServicesInstances(pageLink).success(function(data){
                    var documentLinks =  data.results.documentLinks;
                    var documentObjs =  data.results.documents;

                    for(var index in documentLinks){
                        var linkString = documentLinks[index]
                        console.log("current link string: " + linkString);

                        var document = documentObjs[linkString];
                        console.log("current link document : " + document);

                        var item = {};

                        item["email"] = document.email
                        item["name"]  = linkString

                        $scope.userItems.push(item)
                    }

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of customers, error # " + status;
                });
            }

            var query_spec_total = DataService.querySpecTotalDocument(CONSTANTS.SERVICE_USER.DOCUMENTKIND);
            var query_spec = DataService.querySpec(CONSTANTS.SERVICE_USER.DOCUMENTKIND, CONSTANTS.DEFAULT_PAGE_LIMIT);

            $scope.load_data = function(tableState) {
               $scope.isLoading = true;
               var pagination = tableState.pagination;
                //Current Xenon doesn't support start index
                //var start = pagination.start || 0;
               var number = pagination.number || $scope.itemsByPage;

               // Get the Total count for User Service
               DataService.postServiceInstance(CONSTANTS.SERVICE_QUERY.PATH, query_spec_total).success(function (data) {
                   console.log("get document total successfully");
                   $scope.totalCount = data.results.documentCount;
                   tableState.pagination.numberOfPages = data.results.documentCount/number;

               }).error(function (data, status, headers, config) {
                   $scope.errorMessage = "Couldn't load the list of customers, error # " + status;
               });

                // Get first user document
                DataService.postServiceInstance(CONSTANTS.SERVICE_QUERY.PATH, query_spec).success(function(data, status){
                    console.log("request status: " + status);

                    var nextPageLink = data.results.nextPageLink;
                    console.log ("next page like: " + nextPageLink)

                    if (typeof nextPageLink !== "undefined" && nextPageLink !== null) {
                        $scope.query_users(nextPageLink)
                    }

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of customers, error # " + status;
                });
            };

        }
    ]
);
