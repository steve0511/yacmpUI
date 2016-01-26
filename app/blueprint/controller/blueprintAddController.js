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
                blueprintFiles: [],
                deploymentShutdownDuration: 0,
                deploymentTeardownDuration: 0
            };

            $scope.templates = BlueprintTemplates.templates;
            $scope.blueprintFiles = $scope.blueprint.blueprintFiles;
            $scope.selectedFile = null;
            $scope.editorContents = '';

            $scope.onFileSelect = function (file) {
                if ($scope.selectedFile != null) {
                    $scope.selectedFile.selected = false;
                    $scope.selectedFile.editing = false;
                }
                file.selected = true;
                $scope.selectedFile = file;
                $scope.editorContents = $scope.selectedFile.content;
            };

            $scope.onAdd = function () {
                $scope.selectedFile = {
                    path: 'My File',
                    selected: true,
                    editing: true,
                    content: BlueprintTemplates.blueprintTemplate
                };
                $scope.blueprintFiles.unshift($scope.selectedFile);
            };

            $scope.onEdit = function () {
                $scope.isEditYaml = true;
            };

            $scope.onEditName = function () {
                $scope.selectedFile.editing = true;
            };

            $scope.onCompleteEditName = function () {
                $scope.selectedFile.editing = false;
            };

            $scope.completeEditYaml = function () {
                $scope.isEditYaml = false;
                $scope.selectedFile.content = $scope.editorContents;
            };

            $scope.cancelEditYaml = function () {
                $scope.isEditYaml = false;
                $scope.editorContents = $scope.selectedFile.content;
            };

            $scope.onDelete = function () {
                var index = $scope.blueprintFiles.indexOf($scope.selectedFile);
                if (index != -1) {
                    $scope.selectedFile = null;

                    $scope.blueprintFiles.splice(index, 1);
                }
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