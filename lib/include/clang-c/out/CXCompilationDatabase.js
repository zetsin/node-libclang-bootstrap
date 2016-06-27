var FFI = require('ffi')
var ArrayType = require('ref-array')
var Struct = require('ref-struct')
var Union = require('ref-union');
var ref = require('ref')

var CXString_lib = require('./CXString')

var CXCompilationDatabase_Error = exports.CXCompilationDatabase_Error = {
	CXCompilationDatabase_NoError: 0,
	CXCompilationDatabase_CanNotLoadDatabase: 1,
}

var voit = exports.voit = ref.types.void
var voit_ptr = exports.voit_ptr = ref.refType(voit)
var CXCompilationDatabase = exports.CXCompilationDatabase = voit_ptr
var CXCompileCommands = exports.CXCompileCommands = voit_ptr
var CXCompileCommand = exports.CXCompileCommand = voit_ptr
var uint32 = exports.uint32 = ref.types.uint32
var string = exports.string = ref.types.CString
var uint32_ptr = exports.uint32_ptr = ref.refType(uint32)
var CXString = CXString_lib.CXString

FFI.Library(__dirname + '/libclang', {
	clang_CompilationDatabase_fromDirectory: [ CXCompilationDatabase, [ string, uint32_ptr, ] ],
	clang_CompilationDatabase_dispose: [ voit, [ CXCompilationDatabase, ] ],
	clang_CompilationDatabase_getCompileCommands: [ CXCompileCommands, [ CXCompilationDatabase, string, ] ],
	clang_CompilationDatabase_getAllCompileCommands: [ CXCompileCommands, [ CXCompilationDatabase, ] ],
	clang_CompileCommands_dispose: [ voit, [ CXCompileCommands, ] ],
	clang_CompileCommands_getSize: [ uint32, [ CXCompileCommands, ] ],
	clang_CompileCommands_getCommand: [ CXCompileCommand, [ CXCompileCommands, uint32, ] ],
	clang_CompileCommand_getDirectory: [ CXString, [ CXCompileCommand, ] ],
	clang_CompileCommand_getFilename: [ CXString, [ CXCompileCommand, ] ],
	clang_CompileCommand_getNumArgs: [ uint32, [ CXCompileCommand, ] ],
	clang_CompileCommand_getArg: [ CXString, [ CXCompileCommand, uint32, ] ],
	clang_CompileCommand_getNumMappedSources: [ uint32, [ CXCompileCommand, ] ],
	clang_CompileCommand_getMappedSourcePath: [ CXString, [ CXCompileCommand, uint32, ] ],
	clang_CompileCommand_getMappedSourceContent: [ CXString, [ CXCompileCommand, uint32, ] ],
}, exports)