async function start( _resolve ) {
  await _Say( "Hello, World!" );

  console.log( exampleVariable );

  MenuName( "<em>" + exampleVariable + "</em>" );
  await MenuLabel( "<del>Button1</del>", function() { return; } );
  await MenuLabel( "<strong>Button2</strong>", function() { return; } );
  await MenuLabel( "<mark>Button3</mark>", function() { return; } );
  await MenuLabel( "<i>The illusion of free chouce</i>", function() { return; } );

  _resolve();
}

async function end() {
  await _Say( "Ending" );
}
