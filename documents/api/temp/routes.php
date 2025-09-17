<?php $o = array();

// ** THIS IS AN AUTO GENERATED FILE. DO NOT EDIT MANUALLY ** 

//==================== v1 ====================

$o['v1'] = array();

//==== v1 * ====

$o['v1']['*'] = array (
    'explorer' => 
    array (
        'GET' => 
        array (
            'url' => 'explorer/*',
            'className' => 'Luracast\\Restler\\Explorer',
            'path' => 'explorer',
            'methodName' => 'get',
            'arguments' => 
            array (
            ),
            'defaults' => 
            array (
            ),
            'metadata' => 
            array (
                'description' => 'Serve static files for exploring',
                'longDescription' => 'Serves explorer html, css, and js files',
                'url' => 'GET *',
                'package' => 'Luracast\\Restler',
                'access' => 'hybrid',
                'version' => '3.0.0rc6',
                'scope' => 
                array (
                    '*' => 'Luracast\\Restler\\',
                    'stdClass' => 'stdClass',
                ),
                'resourcePath' => 'explorer',
                'classDescription' => 'Class Explorer',
                'param' => 
                array (
                ),
                'return' => 
                array (
                    'type' => 'array',
                ),
            ),
            'accessLevel' => 1,
        ),
    ),
);

//==== v1 explorer/swagger ====

$o['v1']['explorer/swagger'] = array (
    'GET' => 
    array (
        'url' => 'explorer/swagger',
        'className' => 'Luracast\\Restler\\Explorer',
        'path' => 'explorer',
        'methodName' => 'swagger',
        'arguments' => 
        array (
        ),
        'defaults' => 
        array (
        ),
        'metadata' => 
        array (
            'description' => '',
            'longDescription' => '',
            'return' => 
            array (
                'type' => 'stdClass',
                'description' => '',
                'children' => 
                array (
                ),
            ),
            'package' => 'Luracast\\Restler',
            'access' => 'hybrid',
            'version' => '3.0.0rc6',
            'scope' => 
            array (
                '*' => 'Luracast\\Restler\\',
                'stdClass' => 'stdClass',
            ),
            'resourcePath' => 'explorer',
            'classDescription' => 'Class Explorer',
            'param' => 
            array (
            ),
        ),
        'accessLevel' => 1,
    ),
);

//==================== apiVersionMap ====================

$o['apiVersionMap'] = array();

//==== apiVersionMap Luracast\Restler\Explorer ====

$o['apiVersionMap']['Luracast\Restler\Explorer'] = array (
    1 => 'Luracast\\Restler\\Explorer',
);

//==== apiVersionMap DolibarrApiAccess ====

$o['apiVersionMap']['DolibarrApiAccess'] = array (
    1 => 'DolibarrApiAccess',
);
return $o;