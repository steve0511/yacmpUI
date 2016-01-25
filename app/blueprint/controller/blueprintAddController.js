/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('BluePrintAddController', ['$scope', 'DataService', 'UtilService', 'BlueprintTemplates',
        '$routeParams', '$timeout','$location',

        function ($scope, DataService, UtilService, BlueprintTemplates, $routeParams, $timeout, $location) {
            $scope.templateType = 'Openstack';
            $scope.isEditYaml = false;

            $scope.blueprint = {
                blueprint: BlueprintTemplates.blueprintTemplate,
                deploymentShutdownDuration: 0,
                deploymentTeardownDuration: 0
            };

            $scope.templates = BlueprintTemplates.templates;
            $scope.blueprintFiles = [{
                path: 'Test 1',
                content: 'Test content 1'
            }, {
                path: 'Test 2',
                content: 'Test content 2'
            }, {
                path: 'Test 3',
                content: 'Test content 3'
            }];
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

            $scope.submit = function (blueprint) {
                DataService.post(CONSTANTS.SERVICE_BLUEPRINT.PATH, blueprint).success(function (data, status) {
                    $location.path('/blueprint');
                }).error(function (data, status, headers, config) {
                    $scope.errorMessage = "Couldn't create blueprint, error # " + status;
                });
            };

            $scope.back = function() {
                $location.path('/blueprint');
            };
        }
    ]
);