var g_resolve;

async function start( _resolve ) {
  g_resolve = _resolve;

  // Press any button
  await WaitInput();

  await Say( "<ins>Hello, World!</ins>" );

  console.log( exampleVariable );

  MenuName( "<em>" + exampleVariable + "</em>" );
  await MenuLabel( "<del>Button1</del>", function() { noChoice(); } );
  await MenuLabel( "<strong>Button2</strong>", function() { noChoice(); } );
  await MenuLabel( "<mark>Button3</mark>", function() { noChoice() } );
  await MenuLabel( "<i>The illusion of free choice</i>", function() { noChoice(); } );
}

async function noChoice() {
  g_resolve();
}

async function end() {
  await Say( "Ending" );
}
