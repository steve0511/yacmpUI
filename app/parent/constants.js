/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict'

var CONSTANTS = {
    'SERVICE': {
        'PATH': '/core/ui'
    },
    'UI_RESOURCES': '/user-interface/resources/com/vmware/yacmp/ui/UiService/',
    'UI_BASE': '/core/ui/default#',
    'UI_CUSTOM_BASE': '/core/ui/custom#',

    'CONTENT_TYPE': {
        'JSON': "application/json"
    },

    'DEFAULT_PAGE_LIMIT' : 10,

    'SERVICE_USER' :{
        'ID' : "USER",
        'PATH': "/core/authz/users",
        'DOCUMENTKIND': "com:vmware:xenon:services:common:UserService:UserState"
    },

    'SERVICE_BLUEPRINT' :{
        'ID' : "BLUEPRINT",
        'PATH': "/yacmp/blueprint",
        'DOCUMENTKIND': "com:vmware:yacmp:core:blueprint:Blueprint"
    },

    'SERVICE_CATALOG' :{
        'ID' : "CATALOG",
        'PATH': "/yacmp/catalog",
        'DOCUMENTKIND': "com:vmware:yacmp:core:catalog:Catalog"
    },

    'SERVICE_QUERY' :{
        'ID' : "QUERY TASKS",
        'PATH': "/core/query-tasks",
    }
};
