async function start( _resolve ) {
  await Say( "<ins>Hello, World!</ins>" );

  console.log( exampleVariable );

  MenuName( "<em>" + exampleVariable + "</em>" );
  await MenuLabel( "<del>Button1</del>", function() { _resolve(); } );
  await MenuLabel( "<strong>Button2</strong>", function() { _resolve(); } );
  await MenuLabel( "<mark>Button3</mark>", function() { _resolve(); } );
  await MenuLabel( "<i>The illusion of free choice</i>", function() { _resolve(); } );
}

async function end() {
  await Say( "Ending" );
}
