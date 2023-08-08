async function start( _resolve ) {
  await Say( "<ins>Hello, World!</ins>" );

  console.log( exampleVariable );

  MenuName( "<em>" + exampleVariable + "</em>" );
  await MenuLabel( "<del>Button1</del>", function() { return; } );
  await MenuLabel( "<strong>Button2</strong>", function() { return; } );
  await MenuLabel( "<mark>Button3</mark>", function() { return; } );
  await MenuLabel( "<i>The illusion of free choice</i>", function() { return; } );

  _resolve();
}

async function end() {
  await Say( "Ending" );
}
