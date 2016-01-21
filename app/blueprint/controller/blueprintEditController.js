/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';

angular.module('yacmpApp').controller('BluePrintEditController', ['$scope', 'DataService', 'UtilService',
        '$routeParams', '$timeout','$location',

        function ($scope, DataService, UtilService, $routeParams, $timeout, $location) {

            $scope.isedit = true;

            var id = $routeParams.id;

            DataService.get(CONSTANTS.SERVICE_BLUEPRINT.PATH+"/"+id).success(function (data, status) {
                $scope.blueprint = data;
            }).error(function (data, status, headers, config) {
                $scope.errorMessage = "Couldn't load the blueprint, error # " + status;
            });

            $scope.templates = BlueprintTemplates.templates;

            $scope.addTemplate = function (templateContent) {
                $scope.blueprint.blueprint += templateContent;
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