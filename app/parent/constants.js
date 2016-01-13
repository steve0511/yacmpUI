/*
 * Copyright (c) 2015 VMware, Inc. All Rights Reserved.
 */

'use strict'

var CONSTANTS = {
    'SERVICE': {
        'PATH': '/core/ui'
    },
    'UI_RESOURCES': '/user-interface/resources/com/vmware/yacmp/ui/UiService/',
    'PAGE_RESOUCES': '',
    'UI_BASE': '/core/ui/default#',
    'UI_CUSTOM_BASE': '/core/ui/custom#',

    'CONTENT_TYPE': {
        'JSON': "application/json"
    },

    'DEFAULT_PAGE_LIMIT' : 10,

    'SERVICE_USER' :{
        'ID' : "USER",
        'PATH': "localhost:8000/core/authz/users",
        'DOCUMENTKIND': "com:vmware:xenon:services:common:UserService:UserState"
    },

    'SERVICE_QUERY' :{
        'ID' : "QUERY TASKS",
        'PATH': "localhost:8000/core/query-tasks",
    }
};
