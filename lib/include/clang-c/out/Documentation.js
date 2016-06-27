var FFI = require('ffi')
var ArrayType = require('ref-array')
var Struct = require('ref-struct')
var Union = require('ref-union');
var ref = require('ref')

var Index_lib = require('./Index')
var CXString_lib = require('./CXString')

var CXCommentKind = exports.CXCommentKind = {
	CXComment_Null: 0,
	CXComment_Text: 1,
	CXComment_InlineCommand: 2,
	CXComment_HTMLStartTag: 3,
	CXComment_HTMLEndTag: 4,
	CXComment_Paragraph: 5,
	CXComment_BlockCommand: 6,
	CXComment_ParamCommand: 7,
	CXComment_TParamCommand: 8,
	CXComment_VerbatimBlockCommand: 9,
	CXComment_VerbatimBlockLine: 10,
	CXComment_VerbatimLine: 11,
	CXComment_FullComment: 12,
}
var CXCommentInlineCommandRenderKind = exports.CXCommentInlineCommandRenderKind = {
	CXCommentInlineCommandRenderKind_Normal: 0,
	CXCommentInlineCommandRenderKind_Bold: 1,
	CXCommentInlineCommandRenderKind_Monospaced: 2,
	CXCommentInlineCommandRenderKind_Emphasized: 3,
}
var CXCommentParamPassDirection = exports.CXCommentParamPassDirection = {
	CXCommentParamPassDirection_In: 0,
	CXCommentParamPassDirection_Out: 1,
	CXCommentParamPassDirection_InOut: 2,
}

var voit = exports.voit = ref.types.void
var voit_ptr = exports.voit_ptr = ref.refType(voit)
var CXTranslationUnit = Index_lib.CXTranslationUnit
var c__SA_CXComment = exports.c__SA_CXComment = Struct({
	ASTNode: voit_ptr,
	TranslationUnit: CXTranslationUnit,
})
var CXComment = exports.CXComment = c__SA_CXComment
var CXCursor = Index_lib.CXCursor
var uint32 = exports.uint32 = ref.types.uint32
var CXString = CXString_lib.CXString

FFI.Library(__dirname + '/libclang', {
	clang_Cursor_getParsedComment: [ CXComment, [ CXCursor, ] ],
	clang_Comment_getKind: [ uint32, [ CXComment, ] ],
	clang_Comment_getNumChildren: [ uint32, [ CXComment, ] ],
	clang_Comment_getChild: [ CXComment, [ CXComment, uint32, ] ],
	clang_Comment_isWhitespace: [ uint32, [ CXComment, ] ],
	clang_InlineContentComment_hasTrailingNewline: [ uint32, [ CXComment, ] ],
	clang_TextComment_getText: [ CXString, [ CXComment, ] ],
	clang_InlineCommandComment_getCommandName: [ CXString, [ CXComment, ] ],
	clang_InlineCommandComment_getRenderKind: [ uint32, [ CXComment, ] ],
	clang_InlineCommandComment_getNumArgs: [ uint32, [ CXComment, ] ],
	clang_InlineCommandComment_getArgText: [ CXString, [ CXComment, uint32, ] ],
	clang_HTMLTagComment_getTagName: [ CXString, [ CXComment, ] ],
	clang_HTMLStartTagComment_isSelfClosing: [ uint32, [ CXComment, ] ],
	clang_HTMLStartTag_getNumAttrs: [ uint32, [ CXComment, ] ],
	clang_HTMLStartTag_getAttrName: [ CXString, [ CXComment, uint32, ] ],
	clang_HTMLStartTag_getAttrValue: [ CXString, [ CXComment, uint32, ] ],
	clang_BlockCommandComment_getCommandName: [ CXString, [ CXComment, ] ],
	clang_BlockCommandComment_getNumArgs: [ uint32, [ CXComment, ] ],
	clang_BlockCommandComment_getArgText: [ CXString, [ CXComment, uint32, ] ],
	clang_BlockCommandComment_getParagraph: [ CXComment, [ CXComment, ] ],
	clang_ParamCommandComment_getParamName: [ CXString, [ CXComment, ] ],
	clang_ParamCommandComment_isParamIndexValid: [ uint32, [ CXComment, ] ],
	clang_ParamCommandComment_getParamIndex: [ uint32, [ CXComment, ] ],
	clang_ParamCommandComment_isDirectionExplicit: [ uint32, [ CXComment, ] ],
	clang_ParamCommandComment_getDirection: [ uint32, [ CXComment, ] ],
	clang_TParamCommandComment_getParamName: [ CXString, [ CXComment, ] ],
	clang_TParamCommandComment_isParamPositionValid: [ uint32, [ CXComment, ] ],
	clang_TParamCommandComment_getDepth: [ uint32, [ CXComment, ] ],
	clang_TParamCommandComment_getIndex: [ uint32, [ CXComment, uint32, ] ],
	clang_VerbatimBlockLineComment_getText: [ CXString, [ CXComment, ] ],
	clang_VerbatimLineComment_getText: [ CXString, [ CXComment, ] ],
	clang_HTMLTagComment_getAsString: [ CXString, [ CXComment, ] ],
	clang_FullComment_getAsHTML: [ CXString, [ CXComment, ] ],
	clang_FullComment_getAsXML: [ CXString, [ CXComment, ] ],
}, exports)