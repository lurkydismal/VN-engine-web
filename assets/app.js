async function start( _resolve ) {
  await Say( "<ins>Hello, World!</ins>" );

  console.log( exampleVariable );

  MenuName( "<em>" + exampleVariable + "</em>" );
  await MenuLabel( "<del>Button1</del>", function() { noChoice(); } );
  await MenuLabel( "<strong>Button2</strong>", function() { noChoice(); } );
  await MenuLabel( "<mark>Button3</mark>", function() { noChoice() } );
  await MenuLabel( "<i>The illusion of free choice</i>", function() { noChoice(); } );
}

async function noChoice( _resolve ) {
  _resolve();
}

async function end() {
  await Say( "Ending" );
}
