var FFI = require('ffi')
var ArrayType = require('ref-array')
var Struct = require('ref-struct')
var Union = require('ref-union');
var ref = require('ref')


var CXErrorCode = exports.CXErrorCode = {
	CXError_Success: 0,
	CXError_Failure: 1,
	CXError_Crashed: 2,
	CXError_InvalidArguments: 3,
	CXError_ASTReadError: 4,
}

var voit = exports.voit = ref.types.void
var uint32 = exports.uint32 = ref.types.uint32

FFI.Library(__dirname + '/libclang', {
}, exports)