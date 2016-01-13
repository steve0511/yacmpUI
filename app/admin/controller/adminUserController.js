/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('AdminUserController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout', 'ngDialog', '$route', '$location',

        function ($scope, DataService, UtilService, $routeParams, $timeout, ngDialog, $route, $location) {
            console.log("AdminController")

            $scope.totalCount = 0;

            $scope.userItems = [];

            $scope.errorMessage = null;

            $scope.table_columns = ['name', 'email', 'update_date', 'action'];

            $scope.itemsByPage = CONSTANTS.DEFAULT_PAGE_LIMIT;

            $scope.nextPageLink = null;

            $scope.prevPageLink = null;

            $scope.query_users = function (pageLink) {
                $scope.userItems = [];
                DataService.getServicesInstances(pageLink).success(function (data) {
                    var documentLinks = data.results.documentLinks;
                    var documentObjs = data.results.documents;

                    for (var index in documentLinks) {
                        var linkString = documentLinks[index]
                        console.log("current link string: " + linkString);

                        var document = documentObjs[linkString];
                        console.log("current link document : " + document);

                        var item = {};

                        item["email"] = document.email
                        item["name"] = linkString

                        $scope.userItems.push(item)
                    }

                    $scope.prevPageLink = data.results.prevPageLink;
                    $scope.nextPageLink = data.results.nextPageLink;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of customers, error # " + status;
                });
            }

            var query_spec_total = DataService.querySpecTotalDocument(CONSTANTS.SERVICE_USER.DOCUMENTKIND);
            var query_spec = DataService.querySpec(CONSTANTS.SERVICE_USER.DOCUMENTKIND, CONSTANTS.DEFAULT_PAGE_LIMIT);

            $scope.load_data = function (tableState) {
                $scope.isLoading = true;
                var pagination = tableState.pagination;
                //Current Xenon doesn't support start index
                //var start = pagination.start || 0;
                var number = pagination.number || $scope.itemsByPage;

                // Get the Total count for User Service
                DataService.postServiceInstance(CONSTANTS.SERVICE_QUERY.PATH, query_spec_total).success(function (data) {
                    $scope.totalCount = data.results.documentCount;
                    tableState.pagination.numberOfPages = data.results.documentCount / number;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of customers, error # " + status;
                });

                // Get first user document
                DataService.postServiceInstance(CONSTANTS.SERVICE_QUERY.PATH, query_spec).success(function (data, status) {
                    console.log("request status: " + status);

                    $scope.nextPageLink = data.results.nextPageLink;
                    console.log("next page link: " + $scope.nextPageLink)

                    if (typeof $scope.nextPageLink !== "undefined" && $scope.nextPageLink !== null) {
                        $scope.query_users($scope.nextPageLink)
                    }

                    $scope.isLoading = false;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of customers, error # " + status;
                });
            };


            $scope.view = function (link) {
//                ngDialog.open({ template: '/user-interface/resources/com/vmware/yacmp/ui/UiService/admin/partial/admin_user_detail.html',
//                     className: 'ngdialog-theme-plain',
//                     controller: ['$scope', function($scope) {
//                         DataService.getDocument(link).success(function(data, status){
//                             $scope.user = data;
//                         }).error(function (data, status, headers, config) {
//                             $scope.errorMessage = "Couldn't load the user, error # " + status;
//                         });
//                     }]
//                });
                $location.path('/admin/user/' + user.email);
            };

            $scope.add = function () {
                ngDialog.open({
                    template: '/user-interface/resources/com/vmware/yacmp/ui/UiService/admin/partial/admin_user_add.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            };

            $scope.submit = function (user) {
                console.log(user);
                DataService.postServiceInstance(CONSTANTS.SERVICE_USER.PATH, user).success(function (data, status) {
                    console.log("request status: " + status);
                    ngDialog.close();
                    $route.reload();
                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't add user, error # " + status;
                });

            };

            $scope.delete = function (userlink) {
                ngDialog.openConfirm({
                    template: '<p>Are you sure you want to delete?</p>' +
                    '<div class="confirm">' +
                    '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' +
                    '</button>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' +
                    '</button></div>',
                    plain: true,
                    className: 'ngdialog-theme-default'
                }).then(function (confirm) {
                    DataService.deleteService(userlink).success(function (data, status) {
                        $route.reload();
                    }).error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't delete user, error # " + status;
                    });
                }, function (reject) {
                });
            };

            $scope.getPage = function (pageUrl) {
                $scope.query_users(pageUrl);
            };
        }
    ]
);
