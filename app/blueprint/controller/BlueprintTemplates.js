/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';


// TODO: Move these templates into a proper place. One possible solution is to retrieve them from server. In that case, different endpoints
// can insert their own template
angular.module('yacmpApp').service('BlueprintTemplates', [
    function () {
        this.blueprintTemplate = 'tosca_definitions_version: tosca_simple_yaml_1_0\n\ndescription: #Your description here\n\ntopology_template:\n  inputs:\n    #Input parameters\n\n  node_templates:\n    #Your node definitions here';

        this.templates = [];

        var computeNodeTemplate = {};
        computeNodeTemplate.id = '1';
        computeNodeTemplate.name = 'Compute Node';
        computeNodeTemplate.content = '\n    type: tosca.nodes.Compute\n      capabilities:\n        # Host container properties\n          host:\n          properties:\n            # Compute properties\n            num_cpus: 4\n            mem_size: 2048 MB\n            disk_size: 10 GB\n';
        this.templates.push(computeNodeTemplate);
    }
]);