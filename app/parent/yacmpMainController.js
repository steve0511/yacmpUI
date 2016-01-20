/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('YacmpMainController', ['$scope', '$routeParams', 'UtilService', 'DataService', 'ngDialog', '$timeout',

        function ($scope, $routeParams, UtilService, DataService, ngDialog, $timeout) {
            $scope.$on('$routeChangeSuccess', function () {
                $scope.path= $routeParams.path;
                $scope.service = $routeParams.serviceName;
                $scope.instance = $routeParams.instanceId;
                $scope.baseUrl = UtilService.getBaseUrl();
                $scope.uiBase = CONSTANTS.UI_CUSTOM_BASE;
            });

            $scope.notifications = [];

            $scope.nofificationCount = 0;

            //mock userid, should be fetch from cookie after login
            //var userId = "3ecefd79-e8d6-4aa6-8aec-ff173abcc25c";

            var query_spec_total = DataService.querySpecTotalDocument(CONSTANTS.SERVICE_NOTIFICATION.DOCUMENTKIND);
            var query_spec = DataService.queryNotificationSpec(5);

            // Get first 5 notification document
            DataService.post(CONSTANTS.SERVICE_QUERY.PATH, query_spec).success(function (data, status) {
                $scope.nextPageLink = data.results.nextPageLink;

                console.log("next page link: " + $scope.nextPageLink)

                if (typeof $scope.nextPageLink !== "undefined" && $scope.nextPageLink !== null) {
                    $scope.query($scope.nextPageLink)
                }

            }).error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the notifications, error # " + status;
            });

            var getNotificationCount = function() {
                DataService.post(CONSTANTS.SERVICE_QUERY.PATH, query_spec_total).success(function (data) {
                    $scope.nofificationCount = data.results.documentCount;
                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't get the count of notification, error # " + status;
                });
            }
            getNotificationCount();

            var poll = function() {
                $timeout(function() {
                    getNotificationCount();
                    poll();
                }, 10000);
            };
            poll();

            $scope.query = function (pageLink) {
                DataService.get(pageLink).success(function (data) {
                    var documentLinks = data.results.documentLinks;
                    var documentObjs = data.results.documents;

                    for (var index in documentLinks) {
                        var linkString = documentLinks[index];

                        var document = documentObjs[linkString];

                        var item = {};

                        item["id"] = UtilService.getDocumentLinkId(linkString);
                        if(document.message&&document.message.length>50){
                            item["message"] = document.message.substring(0,50)+"...";
                        }
                        else{
                            item["message"] = document.message;
                        }
                        item["status"] = document.status;
                        item["createDate"] = document.createDate;

                        $scope.notifications.push(item);
                    }

                    $scope.prevPageLink = data.results.prevPageLink;
                    $scope.nextPageLink = data.results.nextPageLink;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of notifications, error # " + status;
                });
            }

        }]
);
