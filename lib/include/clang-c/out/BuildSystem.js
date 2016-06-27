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
var ulonglong = exports.ulonglong = ref.types.ulonglong
var CXVirtualFileOverlayImpl = exports.CXVirtualFileOverlayImpl = Struct({
})
var CXVirtualFileOverlayImpl_ptr = exports.CXVirtualFileOverlayImpl_ptr = ref.refType(CXVirtualFileOverlayImpl)
var CXVirtualFileOverlay = exports.CXVirtualFileOverlay = CXVirtualFileOverlayImpl_ptr
var uint32 = exports.uint32 = ref.types.uint32
var string = exports.string = ref.types.CString
var int32 = exports.int32 = ref.types.int32
var string_ptr = exports.string_ptr = ref.refType(string)
var uint32_ptr = exports.uint32_ptr = ref.refType(uint32)
var voit_ptr = exports.voit_ptr = ref.refType(voit)
var CXModuleMapDescriptorImpl = exports.CXModuleMapDescriptorImpl = Struct({
})
var CXModuleMapDescriptorImpl_ptr = exports.CXModuleMapDescriptorImpl_ptr = ref.refType(CXModuleMapDescriptorImpl)
var CXModuleMapDescriptor = exports.CXModuleMapDescriptor = CXModuleMapDescriptorImpl_ptr

FFI.Library(__dirname + '/libclang', {
	clang_getBuildSessionTimestamp: [ ulonglong, [ ] ],
	clang_VirtualFileOverlay_create: [ CXVirtualFileOverlay, [ uint32, ] ],
	clang_VirtualFileOverlay_addFileMapping: [ uint32, [ CXVirtualFileOverlay, string, string, ] ],
	clang_VirtualFileOverlay_setCaseSensitivity: [ uint32, [ CXVirtualFileOverlay, int32, ] ],
	clang_VirtualFileOverlay_writeToBuffer: [ uint32, [ CXVirtualFileOverlay, uint32, string_ptr, uint32_ptr, ] ],
	clang_free: [ voit, [ voit_ptr, ] ],
	clang_VirtualFileOverlay_dispose: [ voit, [ CXVirtualFileOverlay, ] ],
	clang_ModuleMapDescriptor_create: [ CXModuleMapDescriptor, [ uint32, ] ],
	clang_ModuleMapDescriptor_setFrameworkModuleName: [ uint32, [ CXModuleMapDescriptor, string, ] ],
	clang_ModuleMapDescriptor_setUmbrellaHeader: [ uint32, [ CXModuleMapDescriptor, string, ] ],
	clang_ModuleMapDescriptor_writeToBuffer: [ uint32, [ CXModuleMapDescriptor, uint32, string_ptr, uint32_ptr, ] ],
	clang_ModuleMapDescriptor_dispose: [ voit, [ CXModuleMapDescriptor, ] ],
}, exports)