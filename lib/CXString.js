var FFI = require('ffi')
var ArrayType = require('ref-array')
var Struct = require('ref-struct')
var Union = require('ref-union');
var ref = require('ref')



var voit = exports.voit = ref.types.void
var voit_ptr = exports.voit_ptr = ref.refType(voit)
var uint32 = exports.uint32 = ref.types.uint32
var c__SA_CXString = exports.c__SA_CXString = Struct({
	data: voit_ptr,
	private_flags: uint32,
})
var CXString = exports.CXString = c__SA_CXString
var CXString_ptr = exports.CXString_ptr = ref.refType(CXString)
var c__SA_CXStringSet = exports.c__SA_CXStringSet = Struct({
	Strings: CXString_ptr,
	Count: uint32,
})
var CXStringSet = exports.CXStringSet = c__SA_CXStringSet
var string = exports.string = ref.types.CString
var CXStringSet_ptr = exports.CXStringSet_ptr = ref.refType(CXStringSet)

FFI.Library(__dirname + '/libclang', {
	clang_getCString: [ string, [ CXString, ] ],
	clang_disposeString: [ voit, [ CXString, ] ],
	clang_disposeStringSet: [ voit, [ CXStringSet_ptr, ] ],
}, exports)