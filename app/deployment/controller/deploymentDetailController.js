/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('DeploymentDetailController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout','ngDialog','$rootScope','$location',

        function ($scope, DataService, UtilService, $routeParams, $timeout, ngDialog, $rootScope, $location) {

            $scope.table_columns = ['name', 'type', 'number Of Instances', 'contained in', 'connected to', 'Action', ''];

            var spec = {
                "kind": "com:vmware:yacmp:core:deployment:RefreshDeploymentDetailRequest"
            };

            var id = $routeParams.id;

            $scope.deploymentid = id;

            $scope.activeTab = 1;

            $scope.setActiveTab = function(tabToSet) {
                $scope.activeTab = tabToSet;
            }

            $scope.nodelist = [];

            $scope.executeOperation = function(node_id, operation, deploymentid) {
                ngDialog.open({
                    template: 'deployment/partial/deployment_operation.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope,
                    controller: ['$scope', function($scope) {
                        $scope.submit= function (){
                            var param = {
                                "operation_kwargs" : {},
                                "node_ids": "["+node_id+"]",
                                "node_instance_ids": [],
                                "run_by_dependency_order": false,
                                "operation": operation,
                                "allow_kwargs_override": null,
                                "type_names": []
                            };
                            var operationSpec = {
                                "operationName" : "execute_operation",
                                "operationParamJason" : JSON.stringify(param)
                            };
                            DataService.patch(CONSTANTS.SERVICE_DEPLOYMENT.PATH+"/"+deploymentid, operationSpec).success(function (data) {
                                ngDialog.close();
                            }).error(function (data, status, headers, config) {
                                $scope.errorMessage = "Couldn't load the detail and operation of deployments, error # " + status;
                            });

                        }
                    }]
                });
            }

            DataService.patch(CONSTANTS.SERVICE_DEPLOYMENT.PATH+"/"+id, spec).success(function (data) {
                var detail = data.targetDetails;
                var detailObj = JSON.parse(detail);
                $scope.detail = detailObj;
                for(var index in detailObj.nodes){
                    var node = {};
                    node["deploymentid"] = id;
                    node["name"] = detailObj.nodes[index].id;
                    node["type"] = detailObj.nodes[index].type;
                    node["numberOfInstances"]= detailObj.nodes[index].number_of_instances;
                    node["operation"] = detailObj.nodes[index].operations;
                    var containedin = "";
                    var connectedto = "";
                    if(detailObj.nodes[index].relationships&&detailObj.nodes[index].relationships.length>0){
                        for(var j in detailObj.nodes[index].relationships){
                            if(detailObj.nodes[index].relationships[j].type_hierarchy&&detailObj.nodes[index].relationships[j].type_hierarchy.indexOf("cloudify.relationships.contained_in")>0
                                &&detailObj.nodes[index].relationships[j].target_id){
                                if(containedin.length>0){
                                    containedin += ","+detailObj.nodes[index].relationships[j].target_id;
                                }
                                else{
                                    containedin = detailObj.nodes[index].relationships[j].target_id;
                                }

                            }
                            if(detailObj.nodes[index].relationships[j].type_hierarchy&&detailObj.nodes[index].relationships[j].type_hierarchy.indexOf("cloudify.relationships.connected_to")>0
                                &&detailObj.nodes[index].relationships[j].target_id){
                                if(connectedto.length>0){
                                    connectedto += ","+detailObj.nodes[index].relationships[j].target_id;
                                }
                                else{
                                    connectedto = detailObj.nodes[index].relationships[j].target_id;
                                }
                            }
                        }
                    }
                    node["containedin"] = containedin;
                    node["connectedto"] = connectedto;
                    node["properties"] = detailObj.nodes[index].properties;
                    node["relationship"] = detailObj.nodes[index].relationships;
                    $scope.nodelist.push(node);
                }
                console.log($scope.nodelist);
            }).error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the detail and operation of deployments, error # " + status;
            });

            $scope.viewNodeDetails = function(node){
                $rootScope.node = node;
                $location.path('/deployment/'+node.deploymentid+'/nodeinfo');
            }

        }
    ]
);
