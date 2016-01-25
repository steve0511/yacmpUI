/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('BluePrintAddController', ['$scope', 'DataService', 'UtilService', 'BlueprintTemplates',
        '$routeParams', '$timeout','$location',

        function ($scope, DataService, UtilService, BlueprintTemplates, $routeParams, $timeout, $location) {
            $scope.templateType = 'Openstack';

            $scope.blueprint = {
                blueprint: BlueprintTemplates.blueprintTemplate,
                deploymentShutdownDuration: 0,
                deploymentTeardownDuration: 0
            };

            $scope.templates = BlueprintTemplates.templates;

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