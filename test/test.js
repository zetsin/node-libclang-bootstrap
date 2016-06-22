var lib = require('../index')
var Index = lib.Index
var TranslationUnit = lib.TranslationUnit
var Cursor = lib.Cursor
var Type = lib.Type

var index = Index(true, true)
TranslationUnit(
	index, 
	__dirname + '/test.h', 
	[]
)
.cursor.visitChildren(function(parent) {
	if(this.location.filename == '/Users/zetsin/work/node-libclang-bootstrap/test/test.h') {
		console.log(this)
	}
})

index.dispose()