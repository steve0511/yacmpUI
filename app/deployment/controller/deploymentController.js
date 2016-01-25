/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('DeploymentController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout', 'ngDialog', '$route', '$location',

        function ($scope, DataService, UtilService, $routeParams, $timeout, ngDialog, $route, $location) {

            $scope.totalCount = 0;

            $scope.userItems = [];

            $scope.errorMessage = null;

            $scope.table_columns = ['name', 'status', 'provisionTime', 'day2Operations'];

            $scope.itemsByPage = CONSTANTS.DEFAULT_PAGE_LIMIT;

            $scope.nextPageLink = null;

            $scope.prevPageLink = null;

            $scope.query = function (pageLink) {
                $scope.deployments = [];
                DataService.get(pageLink).success(function (data) {
                    var documentLinks = data.results.documentLinks;
                    var documentObjs = data.results.documents;

                    for (var index in documentLinks) {
                        var linkString = documentLinks[index];

                        var document = documentObjs[linkString];

                        var item = {};

                        item["id"] = UtilService.getDocumentLinkId(linkString);
                        item["name"] = document.name;
                        item["status"] = document.status;
                        item["provisionTime"] = document.provisionTime;
                        item["operation"] = [];

                        $scope.deployments.push(item);

                    }

                    $scope.prevPageLink = data.results.prevPageLink;
                    $scope.nextPageLink = data.results.nextPageLink;

                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't load the list of deployments, error # " + status;
                });
            }

            var query_spec_total = DataService.queryDeploymentTotalDocument();
            var query_spec = DataService.queryDeploymentSpec(CONSTANTS.DEFAULT_PAGE_LIMIT);

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
                    $scope.errorMessage = "Couldn't load the list of deployments, error # " + status;
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
                    $scope.errorMessage = "Couldn't load the list of deployments, error # " + status;
                });
            };


            $scope.view = function (id) {
                $location.path('/deployment/' + id);
            };

            $scope.getPage = function (pageUrl) {
                $scope.query(pageUrl);
            };

            $scope.operationsCollection = {};


            $scope.loadOperation = function(id){
                 if($scope.operationsCollection[id]){
                     return;
                 }
                 var spec = {
                    "kind": "com:vmware:yacmp:core:deployment:RefreshDeploymentDetailRequest"
                 };
                 var operations = [];
                 DataService.patch(CONSTANTS.SERVICE_DEPLOYMENT.PATH+"/"+id, spec).success(function (data) {
                     for(var o in data.day2Operations){
                         var operation={};
                         operation["name"] = data.day2Operations[o].name.replace(/\"/g,"");
                         operation["parameter"] = data.day2Operations[o].parameters;
                         operations.push(operation);
                     }
                     $scope.operationsCollection[id] = operations;
                 }).error(function (data, status, headers, config) {
                     $scope.errorMessage = "Couldn't load the detail and operation of deployments, error # " + status;
                 });

            }

            $scope.execute = function(operation, parameter, id){
                 $scope.workflow = {};
                 ngDialog.open({
                     template: 'deployment/partial/deployment_workflow.html',
                     className: 'ngdialog-theme-plain',
                     scope: $scope,
                     controller: ['$scope', function($scope) {
                         var jsonObj = JSON.parse(parameter);
                         $scope.params = jsonObj;
                         for(var key in jsonObj){
                             var attrName = key;
                             var attrValue = jsonObj[key];
                             $scope.workflow[attrName] = attrValue.default;
                         }
                         $scope.submit= function (){
                             var day2opertaionSpec = {
                                 "operationName" : operation,
                                 "operationParamJason" : JSON.stringify($scope.workflow)
                             };
                             DataService.patch(CONSTANTS.SERVICE_DEPLOYMENT.PATH+"/"+id, day2opertaionSpec).success(function (data) {
                                 ngDialog.close();
                             }).error(function (data, status, headers, config) {
                                 $scope.errorMessage = "Couldn't load the detail and operation of deployments, error # " + status;
                             });

                         }
                     }]
                });

            }

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
                    DataService.deleteDocument(CONSTANTS.SERVICE_DEPLOYMENT.PATH+"/"+id).success(function (data, status) {
                        $route.reload();
                    }).error(function (data, status, headers, config) {
                        $scope.errorMessage = "Couldn't delete blueprint, error # " + status;
                    });
                }, function (reject) {
                });
            };
        }
    ]
);
