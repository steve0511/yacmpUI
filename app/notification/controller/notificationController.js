/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('NotificationController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout', 'ngDialog', '$route', '$location',

        function ($scope, DataService, UtilService, $routeParams, $timeout, ngDialog, $route, $location) {

            $scope.totalCount = 0;

            $scope.unreadCount = 0;

            $scope.errorMessage = null;

            $scope.table_columns = ['message', 'createDate', 'Action'];

            $scope.itemsByPage = CONSTANTS.DEFAULT_PAGE_LIMIT;

            $scope.nextPageLink = null;

            $scope.prevPageLink = null;

            $scope.query = function (pageLink) {
                $scope.notifications = [];
                DataService.get(pageLink).success(function (data) {
                    var documentLinks = data.results.documentLinks;
                    var documentObjs = data.results.documents;

                    for (var index in documentLinks) {
                        var linkString = documentLinks[index];

                        var document = documentObjs[linkString];

                        var item = {};

                        item["id"] = UtilService.getDocumentLinkId(linkString);
                        item["message"] = document.message;
                        item["status"] = document.status;
                        item["createDate"] = document.createDate;

                        $scope.notifications.push(item);
                    }

                    $scope.prevPageLink = data.results.prevPageLink;
                    $scope.nextPageLink = data.results.nextPageLink;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of notifications, error # " + status;
                });
            };

            var query_spec_total = DataService.querySpecTotalDocument(CONSTANTS.SERVICE_NOTIFICATION.DOCUMENTKIND);
            var query_spec = DataService.queryNotificationSpec(CONSTANTS.DEFAULT_PAGE_LIMIT);

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
                    $scope.errorMessage = "Couldn't load the list of notifications, error # " + status;
                });

                DataService.post(CONSTANTS.SERVICE_QUERY.PATH, query_spec).success(function (data, status) {
                    console.log("request status: " + status);

                    $scope.nextPageLink = data.results.nextPageLink;
                    console.log("next page link: " + $scope.nextPageLink)

                    if (typeof $scope.nextPageLink !== "undefined" && $scope.nextPageLink !== null) {
                        $scope.query($scope.nextPageLink)
                    }

                    $scope.isLoading = false;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of notifications, error # " + status;
                });
            };


            $scope.getPage = function (pageUrl) {
                $scope.query(pageUrl);
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
                    DataService.deleteDocument(CONSTANTS.SERVICE_NOTIFICATION.PATH+"/"+id).success(function (data, status) {
                        $route.reload();
                    }).error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't delete message, error # " + status;
                    });
                }, function (reject) {
                });
            };

        }
    ]
);
