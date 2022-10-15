async function start( _resolve ) {
  await _Say( "Hello, World!" );

  console.log( exampleVariable );

  _resolve();
}

async function end( _resolve ) {
  await _Say( "Ending" );
}
