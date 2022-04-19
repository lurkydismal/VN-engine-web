var g_characterName = "";
var g_textColor = "";
var g_divCounter = 0;
var g_loadDivCounter = -1;
var g_menuCounter = 0;
var g_menuChoices = [];
var g_even = false;
var g_skipped = false;
var g_needSkip = false;
var g_typingComplete = true;

const MediaType = {
  MUSIC : 1,
  SOUND : 2,
};

function $( _id ) {
  return ( document.getElementById( _id ) );
}

const sleep = ( _delay ) => new Promise( ( _resolve ) => setTimeout( _resolve, _delay ) );

function getMessage() {
  return ("Hello from JS!");
}

function _TransitionEndEventName() {
  let l_transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  let l_bodyStyle = document.body.style;

  for ( let _transition in l_transitions ) {
    if ( typeof l_bodyStyle[ _transition ] !== "undefined" ) {
      return ( l_transitions[ _transition ] );
    } 
  }
}

function _SetCookie( _key, _value ) {
  document.cookie = `${ _key }=${ encodeURIComponent( _value ) };path=/`;
}

function _GetCookie( _key ) {
  _key += "=";

  for ( _decodedCookie of decodeURIComponent( document.cookie ).split( ";" ) ) {
    while ( _decodedCookie.charAt( 0 ) == " " ) {
      _decodedCookie = _decodedCookie.substring( 1 );
    }

    if ( _decodedCookie.indexOf( _key ) == 0 ) {
      return ( _decodedCookie.substring( _key.length, _decodedCookie.length ) );
    }
  }

  return ( "" );
}

function _DeleteCookie( _key ) {
  document.cookie = `${ _key }=;expires=Thu, 01 Jan 1970;path=/;`;
}

function _DownloadFile( _text, _filename = "save.js" ) {
  let l_element = document.createElement( "a" );
  l_element.setAttribute( "href", `data:text/plain;charset=utf-8, ${ encodeURIComponent( _text ) }` );
  l_element.setAttribute( "download", _filename );

  l_element.style.display = "none";
  document.body.appendChild( l_element );

  l_element.click();

  l_element.parentNode.removeChild( l_element );
}

function _ReadFile( _path, _callback = console.log ) {
  if ( window.location.protocol == "file:" ) {
    let l_element = document.createElement( "input" );
    l_element.setAttribute( "type", "file" );
    l_element.onchange = ( _event ) => {
      let l_fileBlob = _event.target.files[ 0 ];

      let l_fileReaderInstance = new FileReader();

      l_fileReaderInstance.addEventListener( "load", function( _event ) {
        _callback( _event.target.result );
      });

      l_fileReaderInstance.readAsText( l_fileBlob );
    };

    l_element.classList.add( "d-none" );

    document.body.appendChild( l_element );

    l_element.click();

    l_element.parentNode.removeChild( l_element );

  } else {
    let l_xmlHttp = new XMLHttpRequest();

    l_xmlHttp.onreadystatechange = function() {
      if ( ( l_xmlHttp.readyState == 4 ) && ( l_xmlHttp.status == 200 ) ) {
        _callback( l_xmlHttp.responseText );
      }
    };

    l_xmlHttp.open( "GET", _path, true );
    l_xmlHttp.send( null );
  }
}

function _LoadSave( _path ) {
  if ( !!_GetCookie( "hasCookie" ) ) {
    _ParseSave( _GetCookie( "_lastSave" ) );

  } else {
    _ReadFile( "", _ParseSave );
  }
}

function _ParseSave( _lastSave ) {
  console.log ( _lastSave );
  if ( typeof _lastSave !== "undefined" ) {
    let l_text = "";
    let l_commaCount = 0;

    g_menuChoices = [];

    for ( _decodedSave of decodeURIComponent( _lastSave ) ) {
      while ( _decodedSave.charAt( 0 ) == " " ) {
        _decodedSave = _decodedSave.substring( 1 );
      }

      for ( let _symbol of _decodedSave ) {
        if ( _symbol == "\|" ) {
          g_loadDivCounter = parseInt( unescape( l_text ) );

          l_text = "";

        } else if ( _symbol == "\," ) {
          g_menuChoices.push( unescape( l_text ) );

          l_commaCount++;
          l_text = "";

        } else {
          l_text += _symbol;
        }
      }
    }
  }
}

function _CreateSave() {
  if ( !!_GetCookie( "hasCookie" ) ) {
    _SetCookie( "_lastSave", _GenerateSave() );

  } else {
    _DownloadFile( `${ encodeURIComponent( _GenerateSave() ) }`, "lastsave.txt" );
  }
}

function _GenerateSave() {
  let l_saveData = `${ escape( g_divCounter ) }\|`; // Example: "50|choiceValue3,choiceValue11,choiceValue1"

  for ( let _menuChoice of g_menuChoices ) {
    l_saveData += escape( _menuChoice ) + ",";
  }

  return ( l_saveData );
}

function _Open( _file ) {
  window.open( _file, "_self" );
}

function _GetCountOfChildElements( _parent ) {
    let l_relevantChildCount = 0;

    for ( let _child of _parent.childNodes ) {
        if ( _child.nodeType != 3 ) {
            l_relevantChildCount++;
        }
    }

    return ( l_relevantChildCount );
}

function _ChooseMenuInput( _this, _num ) {
  for ( let _div of document.querySelectorAll( "._count" + _num ) ) {
    _div.classList.add( "disabled" );
    _div.removeAttribute( "onclick" );
  }

  _this.classList.add( "Active" );
}

function _TypingText( _selector, _text ) {
  let l_typed = new Typed( _selector, {
    /**
     * @property {array} strings strings to be typed
     * @property {string} stringsElement ID of element containing string children
     */
    strings: [
      _text
    ],
    stringsElement: null,

    /**
     * @property {number} typeSpeed type speed in milliseconds
     */
    typeSpeed: $( "typingSpeed" ).value,

    /**
     * @property {number} startDelay time before typing starts in milliseconds
     */
    startDelay: 0,

    /**
     * @property {number} backSpeed backspacing speed in milliseconds
     */
    backSpeed: 0,

    /**
     * @property {boolean} smartBackspace only backspace what doesn't match the previous string
     */
    smartBackspace: true,

    /**
     * @property {boolean} shuffle shuffle the strings
     */
    shuffle: false,

    /**
     * @property {number} backDelay time before backspacing in milliseconds
     */
    backDelay: 700,

    /**
     * @property {boolean} fadeOut Fade out instead of backspace
     * @property {string} fadeOutClass css class for fade animation
     * @property {boolean} fadeOutDelay Fade out delay in milliseconds
     */
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500,

    /**
     * @property {boolean} loop loop strings
     * @property {number} loopCount amount of loops
     */
    loop: false,
    loopCount: Infinity,

    /**
     * @property {boolean} showCursor show cursor
     * @property {string} cursorChar character for cursor
     * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
     */
    showCursor: false,
    cursorChar: "_",
    autoInsertCss: true,

    /**
     * @property {string} attr attribute for typing
     * Ex: input placeholder, value, or just HTML text
     */
    attr: null,

    /**
     * @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input
     */
    bindInputFocusEvents: false,

    /**
     * @property {string} contentType 'html' or 'null' for plaintext
     */
    contentType: "html",

    /**
     * Before it begins typing
     * @param {Typed} self
     */
    onBegin: ( self ) => { console.log( "begin" ); },

    /**
     * All typing is complete
     * @param {Typed} self
     */
    onComplete: ( self ) => {
      console.log( "complete" );
      g_typingComplete = true;
    },

    /**
     * Before each string is typed
     * @param {number} arrayPos
     * @param {Typed} self
     */
    preStringTyped: ( arrayPos, self ) => { console.log( "pre" ); },

    /**
     * After each string is typed
     * @param {number} arrayPos
     * @param {Typed} self
     */
    onStringTyped: ( arrayPos, self ) => { console.log( "typed" ); },

    /**
     * During looping, after last string is typed
     * @param {Typed} self
     */
    onLastStringBackspaced: ( self ) => { console.log( "last" ); },

    /**
     * Typing has been stopped
     * @param {number} arrayPos
     * @param {Typed} self
     */
    onTypingPaused: ( arrayPos, self ) => { console.log( "paused" ); },

    /**
     * Typing has been started after being stopped
     * @param {number} arrayPos
     * @param {Typed} self
     */
    onTypingResumed: ( arrayPos, self ) => { console.log( "resumed" ); },

    /**
     * After reset
     * @param {Typed} self
     */
    onReset: ( self ) => { console.log( "reset" ); },

    /**
     * After stop
     * @param {number} arrayPos
     * @param {Typed} self
     */
    onStop: ( arrayPos, self ) => { console.log( "stop" ); },

    /**
     * After start
     * @param {number} arrayPos
     * @param {Typed} self
     */
    onStart: ( arrayPos, self ) => { console.log( "start" ); },

    /**
     * After destroy
     * @param {Typed} self
     */
    onDestroy: ( self ) => { console.log( "destroy" ); }
  });
}

var g_soundVector = [];
var g_audioMusic;

function _PlayBase64( _type, _base64, _fileType = "mp3", loop = true ) {
  switch ( _type ) {
    case MediaType.MUSIC:
    {
      if ( g_audioMusic ) {
        _Stop( _type );
      }

      g_audioMusic = new Audio( `data:audio/${ _fileType };base64, ${ _base64 }` );
      g_audioMusic.volume = ( $( "volumeMusic" ).value / 100 );
      g_audioMusic.loop = loop;
      g_audioMusic.autoplay = true;

      break;
    }

    case MediaType.SOUND:
    {
      let l_audioSound = new Audio( `data:audio/${ _fileType };base64, ${ _base64 }` );
      l_audioSound.volume = ( $( "volumeSounds" ).value / 100 );
      l_audioSound.autoplay = true;

      l_audioSound.onended = ( _event ) => {
        g_soundVector.pop();
      };

      g_soundVector.push( l_audioSound );

      break;
    }

    default:
    {
      console.log( `Cannot play, unsupported media type: ${ _type.toString( 10 ) }.` );
    }
  };
}

function _Play( _type, _path, loop = true ) {
  switch ( _type ) {
    case MediaType.MUSIC:
    {
      if ( g_audioMusic ) {
        _Stop( _type );
      }

      g_audioMusic = new Audio( `./audio/${ _path }` );
      g_audioMusic.volume = ( $( "volumeMusic" ).value / 100 );
      g_audioMusic.autoplay = true;
      g_audioMusic.loop = loop;

      console.log( g_audioMusic );

      break;
    }

    case MediaType.SOUND:
    {
      let l_audioSound = new Audio( `./audio/${ _path }` );
      l_audioSound.volume = ( $( "volumeSounds" ).value / 100 );
      l_audioSound.autoplay = true;

      l_audioSound.onended = ( _event ) => {
        g_soundVector.pop();
      };

      g_soundVector.push( l_audioSound );

      console.log( l_audioSound );

      break;
    }

    default:
    {
      console.log( `Cannot play ${ _path } , unsupported media type: ${ _type.toString( 10 ) }.` );
    }
  };
}

function _Pause( _type ) {
  switch ( _type ) {
    case MediaType.MUSIC:
    {
      g_audioMusic.pause();

      break;
    }

    case MediaType.SOUND:
    {
      for ( let l_audioSound of g_soundVector ) {
        l_audioSound.pause();
      }

      break;
    }

    default:
    {
      console.log( `Cannot stop, unsupported media type: ${ _type.toString( 10 ) }.` );
    }
  };
}

function _Stop( _type ) {
  switch ( _type ) {
    case MediaType.MUSIC:
    {
      g_audioMusic.pause();
      g_audioMusic.currentTime = 0;

      break;
    }

    case MediaType.SOUND:
    {
      for ( let l_audioSound of g_soundVector ) {
        l_audioSound.pause();
        l_audioSound.currentTime = 0;
      }

      break;
    }

    default:
    {
      console.log( `Cannot stop, unsupported media type: ${ _type.toString( 10 ) }.` );
    }
  };
}

function _Resume( _type ) {
  switch ( _type ) {
    case MediaType.MUSIC:
    {
      g_audioMusic.resume();

      break;
    }

    case MediaType.SOUND:
    {
      for ( let l_audioSound of g_soundVector ) {
        l_audioSound.resume();
      }

      break;
    }

    default:
    {
      console.log( `Cannot stop, unsupported media type: ${ _type.toString( 10 ) }.` );
    }
  };
}

function _Say( _text ) {
  let l_characterName = "";

  g_divCounter++;

  if ( g_divCounter < g_loadDivCounter ) {
    return;
  }

  if ( !!g_characterName ) {
    l_characterName = `<h1 class=\"display-5 fw-bold text-white\">${ g_characterName }</h1>`; // zxc
  }

  g_typingComplete = false;

  $( "msg" ).innerHTML +=
"<div class=\"bg-dark text-secondary px-4 py-5 text-center\" id=\"_div" + g_divCounter + "_say\">" +
  "<div class=\"py-5\">" +
    l_characterName +
    "<div class=\"col-lg-10 mx-auto\" id=\"_con" + g_divCounter + "\">" +
      `<p class=\"fs-5 mb-4\" ${ g_textColor } id=\"_typing` + g_divCounter + `\"></p>` +
    "</div>" +
  "</div>" +
"</div>" +
"<div class=\"b-example-divider\" id=\"_divider" + g_divCounter + "_say\"></div>";

  g_characterName = "";
  g_textColor = "";

  setTimeout( () => {
    $( "_div" + g_divCounter + "_say" ).classList.add( "transition" );
    $( "_divider" + g_divCounter + "_say" ).classList.add( "transition" );
    $( "_div" + g_divCounter + "_say" ).scrollIntoView();

    if ( !!$( "_div" + ( g_divCounter - 5 ) + "_say" ) ) {
      $( "_div" + ( g_divCounter - 5 ) + "_say" ).parentNode.removeChild( $( "_div" + ( g_divCounter - 5 ) + "_say" ) );
      $( "_divider" + ( g_divCounter - 5 ) + "_say" ).parentNode.removeChild( $( "_divider" + ( g_divCounter - 5 ) + "_say" ) );
    }

    _TypingText( "#_typing" + g_divCounter, _text );
  }, 20 );
}

function _SayEx( _text, beforeText = "<br>" ) {
  if ( g_divCounter < g_loadDivCounter ) {
    return;
  }

  $( "_typing" + g_divCounter ).innerHTML += "<span id=\"_typingEx" + g_divCounter + "\"></span>";
  _TypingText( "#_typingEx" + g_divCounter + ":last-of-type", beforeText + _text );
}

async function _MenuName( _text ) {
  g_menuCounter++;

  if ( g_divCounter < g_loadDivCounter ) {
    return;
  }

  if ( ( !_text ) && ( !!$( "_con" + g_divCounter ) ) ) {
    $( "_con" + g_divCounter ).innerHTML +=
    "<div class=\"d-grid gap-2 d-sm-flex flex-wrap justify-content-sm-center\" id=\"_menu" + g_menuCounter + "\">" +
    "</div>";

  } else {
    $( "msg" ).innerHTML +=
"<div class=\"bg-dark text-secondary px-4 py-5 text-center\" id=\"_div" + g_menuCounter + "_menu\">" +
  "<div class=\"py-5\">" +
    `<h1 class=\"display-5 fw-bold text-white\">${ _text }</h1>` +
    "<div class=\"col-lg-10 mx-auto\">" +
      "<div class=\"d-grid gap-2 d-sm-flex flex-wrap justify-content-sm-center\" id=\"_menu" + g_menuCounter + "\">" +
      "</div>" +
    "</div>" +
  "</div>" +
"</div>" +
"<div class=\"b-example-divider\" id=\"_divider" + g_menuCounter + "_menu\"></div>";

    g_characterName = "";
    g_textColor = "";

    setTimeout( () => {
      $( "_div" + g_menuCounter + "_menu" ).classList.add( "transition" );
      $( "_divider" + g_menuCounter + "_menu" ).classList.add( "transition" );
      $( "_div" + g_menuCounter + "_menu" ).scrollIntoView();

      if ( !!$( "_div" + ( g_divCounter - 1 ) + "_menu" ) ) {
        $( "_div" + ( g_menuCounter - 1 ) + "_menu" ).parentNode.removeChild( $( "_div" + ( g_menuCounter - 1 ) + "_menu" ) );
        $( "_divider" + ( g_menuCounter - 1 ) + "_menu" ).parentNode.removeChild( $( "_divider" + ( g_menuCounter - 1 ) + "_menu" ) );
      }
    }, 20 );
  }
}

async function _MenuLabel( _text, _function ) {
  if ( ( g_divCounter >= g_loadDivCounter ) && ( !!$( "_menu" + g_menuCounter ) ) ) {
    if ( typeof this[ _text ] !== "undefined" ) {
      $( "_menu" + g_menuCounter ).innerHTML +=
    "<input type=\"text\" class=\"form-control text-center _count" + g_menuCounter +
    `\" oninput=\"${ _text } = this.value\" onpaste=\"this.readOnly = true; _ChooseMenuInput( this, ${ g_menuCounter } ); if ( g_menuCounter > g_menuChoices.length ) { g_menuChoices.push( &quot;${ _text }&quot; ); } !${ _function.toString().replaceAll( "\"", "&quot;") }();\">`;

      setTimeout( async () => {
        while ( !g_typingComplete ) {
          await sleep( 20 );
        }

        for ( let _div of document.querySelectorAll( "input._count" + g_menuCounter ) ) {
          _div.classList.add( "transition" );
        }
      }, 20 );

    } else {
      let l_even = ( g_even ) ? "light" : "info";

      g_even = !g_even;

      $( "_menu" + g_menuCounter ).innerHTML +=
    "<button type=\"button\" class=\"btn btn-outline-" + l_even +
      " btn-lg px-4 _count" + g_menuCounter +
      `\" onclick=\"_ChooseMenuInput( this, ${ g_menuCounter } ); if ( g_menuCounter > g_menuChoices.length ) { g_menuChoices.push( &quot;${ _text }&quot; ); } !${ _function.toString().replaceAll( "\"", "&quot;") }();\">` +
    _text +
    "</button>";

      setTimeout( async () => {
        while ( !g_typingComplete ) {
          await sleep( 20 );
        }

        for ( let _div of document.querySelectorAll( "button._count" + g_menuCounter ) ) {
          _div.classList.add( "transition" );
        }
      }, 20 );
    }
  } else {
    if ( g_menuChoices[ g_menuCounter - 1 ] == _text ) {
      _function();
    }
  }
}

const _WaitInput = async function( delay = 500 ) {
  if ( g_divCounter < g_loadDivCounter ) {
    return;
  }

  while ( !g_typingComplete ) {
    await sleep( delay );
  }

  g_needSkip = true;

  while ( !g_skipped ) {
    await sleep( delay );
  }

  g_skipped  = false;
  g_needSkip = false;
}

function Character( { name = "", color = "#ffffff" } = {} ) {
  g_characterName = name;
  g_textColor     = "style=\"color: " + color + "\"";

  return _Say;
}