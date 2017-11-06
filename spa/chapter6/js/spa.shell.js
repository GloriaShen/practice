/* 
	spa.shell.js
	Shell module for SPA 
*/

/*jslint         
	browser : true, continue : true,
	devel  : true, indent  : 4,    maxerr   : 50,
	newcap : true, nomen   : true, plusplus : true,
	regexp : true, sloppy  : true, vars     : false,
	white  : true
*/
/* global $, spa */
spa.shell = (function () {
    'user strict';
	//---------------- BEGIN MODULE SCOPE VARIABLES --------------
	var configMap = {
		main_html: String()
		+ '<div class="spa-shell-head">'
          + '<div class="spa-shell-head-logo">'
            + '<h1>SPA</h1>'
            + '<p>js end to end</p>'
          + '</div>'
          + '<div class="spa-shell-head-acct"></div>'
          + '<div class="spa-shell-head-search"></div>'
        + '</div>'
        + '<div class="spa-shell-main">'
          + '<div class="spa-shell-main-nav"></div>'
          + '<div class="spa-shell-main-content"></div>'
        + '</div>'
        + '<div class="spa-shell-foot"></div>'
        + '<div class="spa-shell-modal"></div>',
        chat_extend_time: 1000,
        chat_retract_time: 300,
        chat_extend_height: 450,
        chat_retract_height: 15,
        chat_extend_title: 'Click to retract',
        chat_retract_title: 'Click to extend'
	},
	stateMap = { 
        $container: null,
        is_chat_retracted: true
    },
	jqueryMap = {},
    setJqueryMap, onTapAcct, 
    onLogin, onLogout, initModule;
	//----------------- END MODULE SCOPE VARIABLES ---------------
	
	//-------------------- BEGIN UTILITY METHODS -----------------
    //--------------------- END UTILITY METHODS ------------------
    
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
	setJqueryMap = function () {
		var $container = stateMap.$container;
		jqueryMap = { 
            $container: $container,
            $acct: $container.find('.spa-shell-head-acct'),
            $nav: $container.find('spa-shell-main-nav')
        };
	};
    // End DOM method /setJqueryMap/
    onTapAcct = function ( event ) {
        var acct_text, user_name, user = spa.model.people.get_user();
        if ( user.get_is_anon() ) {
            user_name = prompt( 'Please sign-in' );
            spa.model.people.login( user_name );
            jqueryMap.$acct.text( '...processing...' );
        } else {
            spa.model.people.logout();
        }
        return false;
    };
    onLogin = function ( event, login_user ) {
        console.log('shell onLogin:', login_user);
        jqueryMap.$acct.text( login_user.name );
    };
    onLogout = function ( event, logout_user ) {
        jqueryMap.$acct.text('Please sign-in');
    };
    //--------------------- END DOM METHODS ----------------------
    
    //------------------- BEGIN EVENT HANDLERS -------------------

    //-------------------- END EVENT HANDLERS --------------------
    
    //------------------- BEGIN PUBLIC METHODS -------------------
    // Begin Public method /initModule/
    initModule = function ($container) {
    	stateMap.$container = $container;
    	$container.html( configMap.main_html );
    	setJqueryMap();

        spa.chat.configModule({
            chat_model: spa.model.chat,
            people_model: spa.model.people
        });
        spa.chat.initModule( jqueryMap.$container );

        spa.avtr.configModule({
            chat_model: spa.model.chat,
            people_model: spa.model.people
        });
        spa.avtr.initModule( jqueryMap.$container );

        // initialize chat slider and bing click handler
        stateMap.is_chat_retracted = true;

        $.gevent.subscribe( $container, 'spa-login', onLogin );
        $.gevent.subscribe( $container, 'spa-logout', onLogout );

        jqueryMap.$acct.text( 'Please sign-in' )
            .bind( 'utap', onTapAcct );

    };
    // End Public method /initModule/
    return { initModule: initModule };
    //------------------- END PUBLIC METHODS -------------------
}());