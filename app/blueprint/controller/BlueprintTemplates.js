/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict';


// TODO: Move these templates into a proper place. One possible solution is to retrieve them from server. In that case, different endpoints
// can insert their own template
angular.module('yacmpApp').service('BlueprintTemplates', [
    function () {
        this.blueprintTemplate = 'tosca_definitions_version: cloudify_dsl_1_2\n\ndescription: # Your description here\n\ninputs:\n  # Input parameters\n\nnode_templates:\n  # Your node definitions here';

        // TODO: For now, we will only support Openstack. In future, we will have different template providers and the final UI will show different
        // types of template snippets. Then the this.templates variable will store objects like below:
        // {
        //     type: 'Openstack',
        //     snippets: [{
        //         name: 'Compute Node',
        //         content: ...
        //     }]
        // }
        // And these templates should be retrieved from server. For now, we will hard code them here
        this.templates = {
            openstack: [{
                name: 'Server',
                description: 'Creates an Openstack server instance',
                content: '\n  # Server name\n    type: cloudify.openstack.nodes.Server\n      server: # Server configurations\n    relationships: # Relationships\n'
            }, {
                name: 'Floating IP',
                description: 'Creates a floating IP to be attached to a specific host. Use server\'s relationships field to associate it with this floating IP, via cloudify.openstack.server_connected_to_floating_ip relationship',
                content: '\n  # Floating IP name\n    type: cloudify.openstack.nodes.FloatingIP\n'
            }, {
                name: 'Security Group',
                description: 'Create a security group to be assigned to a specific host, to avoid invalid access. Use server\'s relationships field to associate it with this security group, via cloudify.openstack.server_connected_to_security_group relationship',
                content: '\n  # Security group name\n  type: cloudify.openstack.nodes.SecurityGroup\n    properties:\n      rules:\n        - remote_ip_prefix: # IP prefix\n          port: # Port number\n'
            }, {
                name: 'KeyPair',
                description: 'Create a keypair which could be connected with a server node via cloudify.openstack.server_connected_to_keypair relationship',
                content: '\n  # Key pair name\n  type: cloudify.openstack.nodes.KeyPair\n    properties:\n      public_key:\n        user: # User name\n        key: # Public key\n'
            }, {
                name: 'Volume',
                description: 'Create a volume which could be attached to a server node via cloudify.openstack.volume_attached_to_server',
                content: '\n  # Volume name\n  type: cloudify.openstack.nodes.Volume\n    Properties:\n      size: # Size'
            }],
            // cloudify.openstack.nodes.Subnet
            // cloudify.openstack.nodes.Router
            // cloudify.openstack.nodes.Port
            // cloudify.openstack.nodes.Network
            // cloudify.openstack.nodes.Volume
            // cloudify.openstack.nova_net.nodes.FloatingIP
            // cloudify.openstack.nova_net.nodes.SecurityGroup

            vSphere: [{
                name: 'Server',
                description: 'Creates an vSphere server instance',
                content: '\n  # Server name\n    type: cloudify.vsphere.nodes.server\n      server: # Server configurations\n    relationships: # Relationships\n'
            }, {
                name: 'cloudify.vsphere.nodes.storage',
                description: 'Create a storage which could be attached to a vSphere server node via cloudify.vsphere.volume_attached_to_server',
                content: '\n  # Volume name\n  type: cloudify.openstack.nodes.Volume\n    Properties:\n      size: # Size'
            }]
        }
        // cloudify.vsphere.nodes.network
    }
]);