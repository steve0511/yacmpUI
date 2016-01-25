/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('BluePrintEditController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout','$location',

        function ($scope, DataService, UtilService, $routeParams, $timeout, $location) {
            $scope.isedit = true;

            $scope.templateType = 'Openstack';
            $scope.isEditYaml = false;

            var id = $routeParams.id;

            DataService.get(CONSTANTS.SERVICE_BLUEPRINT.PATH+"/"+id).success(function (data, status) {
                $scope.blueprint = data;
                $scope.blueprintFiles = data.blueprintFiles; // TODO: Check when we have done with saving and retrieving blueprint from server
                if ($scope.blueprintFiles.length > 0) {
                    $scope.onFileSelect($scope.blueprintFiles[0]);
                }
            }).error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the blueprint, error # " + status;
            });

            $scope.templates = BlueprintTemplates.templates;
            $scope.blueprintFiles = [];
            $scope.selectedFile = null;

            $scope.onFileSelect = function (file) {
                if ($scope.selectedFile != null) {
                    $scope.selectedFile.selected = false;
                }
                file.selected = true;
                $scope.selectedFile = file;
            };

            $scope.addTemplate = function (templateContent) {
                $scope.blueprint.blueprint += templateContent;
            };

            $scope.setTemplateType = function (templateType) {
                $scope.templateType = templateType;
            };

            $scope.save = function (blueprint) {
                DataService.put(CONSTANTS.SERVICE_BLUEPRINT.PATH+"/"+id, blueprint).success(function (data, status) {
                    $location.path('/blueprint');
                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't edit blueprint, error # " + status;
                });
            }

            $scope.back = function() {
                $location.path('/blueprint');
            };
        }
    ]
);