var FFI = require('ffi')
var ArrayType = require('ref-array')
var Struct = require('ref-struct')
var Union = require('ref-union');
var ref = require('ref')

var CXString_lib = require('./CXString')

var CXAvailabilityKind = exports.CXAvailabilityKind = {
	CXAvailability_Available: 0,
	CXAvailability_Deprecated: 1,
	CXAvailability_NotAvailable: 2,
	CXAvailability_NotAccessible: 3,
}
var CXGlobalOptFlags = exports.CXGlobalOptFlags = {
	CXGlobalOpt_None: 0,
	CXGlobalOpt_ThreadBackgroundPriorityForIndexing: 1,
	CXGlobalOpt_ThreadBackgroundPriorityForEditing: 2,
	CXGlobalOpt_ThreadBackgroundPriorityForAll: 3,
}
var CXDiagnosticSeverity = exports.CXDiagnosticSeverity = {
	CXDiagnostic_Ignored: 0,
	CXDiagnostic_Note: 1,
	CXDiagnostic_Warning: 2,
	CXDiagnostic_Error: 3,
	CXDiagnostic_Fatal: 4,
}
var CXLoadDiag_Error = exports.CXLoadDiag_Error = {
	CXLoadDiag_None: 0,
	CXLoadDiag_Unknown: 1,
	CXLoadDiag_CannotLoad: 2,
	CXLoadDiag_InvalidFile: 3,
}
var CXDiagnosticDisplayOptions = exports.CXDiagnosticDisplayOptions = {
	CXDiagnostic_DisplaySourceLocation: 1,
	CXDiagnostic_DisplayColumn: 2,
	CXDiagnostic_DisplaySourceRanges: 4,
	CXDiagnostic_DisplayOption: 8,
	CXDiagnostic_DisplayCategoryId: 16,
	CXDiagnostic_DisplayCategoryName: 32,
}
var CXErrorCode = exports.CXErrorCode = {
	CXError_Success: 0,
	CXError_Failure: 1,
	CXError_Crashed: 2,
	CXError_InvalidArguments: 3,
	CXError_ASTReadError: 4,
}
var CXTranslationUnit_Flags = exports.CXTranslationUnit_Flags = {
	CXTranslationUnit_None: 0,
	CXTranslationUnit_DetailedPreprocessingRecord: 1,
	CXTranslationUnit_Incomplete: 2,
	CXTranslationUnit_PrecompiledPreamble: 4,
	CXTranslationUnit_CacheCompletionResults: 8,
	CXTranslationUnit_ForSerialization: 16,
	CXTranslationUnit_CXXChainedPCH: 32,
	CXTranslationUnit_SkipFunctionBodies: 64,
	CXTranslationUnit_IncludeBriefCommentsInCodeCompletion: 128,
	CXTranslationUnit_CreatePreambleOnFirstParse: 256,
}
var CXSaveTranslationUnit_Flags = exports.CXSaveTranslationUnit_Flags = {
	CXSaveTranslationUnit_None: 0,
}
var CXSaveError = exports.CXSaveError = {
	CXSaveError_None: 0,
	CXSaveError_Unknown: 1,
	CXSaveError_TranslationErrors: 2,
	CXSaveError_InvalidTU: 3,
}
var CXReparse_Flags = exports.CXReparse_Flags = {
	CXReparse_None: 0,
}
var CXTUResourceUsageKind = exports.CXTUResourceUsageKind = {
	CXTUResourceUsage_AST: 1,
	CXTUResourceUsage_Identifiers: 2,
	CXTUResourceUsage_Selectors: 3,
	CXTUResourceUsage_GlobalCompletionResults: 4,
	CXTUResourceUsage_SourceManagerContentCache: 5,
	CXTUResourceUsage_AST_SideTables: 6,
	CXTUResourceUsage_SourceManager_Membuffer_Malloc: 7,
	CXTUResourceUsage_SourceManager_Membuffer_MMap: 8,
	CXTUResourceUsage_ExternalASTSource_Membuffer_Malloc: 9,
	CXTUResourceUsage_ExternalASTSource_Membuffer_MMap: 10,
	CXTUResourceUsage_Preprocessor: 11,
	CXTUResourceUsage_PreprocessingRecord: 12,
	CXTUResourceUsage_SourceManager_DataStructures: 13,
	CXTUResourceUsage_Preprocessor_HeaderSearch: 14,
	CXTUResourceUsage_MEMORY_IN_BYTES_BEGIN: 1,
	CXTUResourceUsage_MEMORY_IN_BYTES_END: 14,
	CXTUResourceUsage_First: 1,
	CXTUResourceUsage_Last: 14,
}
var CXCursorKind = exports.CXCursorKind = {
	CXCursor_UnexposedDecl: 1,
	CXCursor_StructDecl: 2,
	CXCursor_UnionDecl: 3,
	CXCursor_ClassDecl: 4,
	CXCursor_EnumDecl: 5,
	CXCursor_FieldDecl: 6,
	CXCursor_EnumConstantDecl: 7,
	CXCursor_FunctionDecl: 8,
	CXCursor_VarDecl: 9,
	CXCursor_ParmDecl: 10,
	CXCursor_ObjCInterfaceDecl: 11,
	CXCursor_ObjCCategoryDecl: 12,
	CXCursor_ObjCProtocolDecl: 13,
	CXCursor_ObjCPropertyDecl: 14,
	CXCursor_ObjCIvarDecl: 15,
	CXCursor_ObjCInstanceMethodDecl: 16,
	CXCursor_ObjCClassMethodDecl: 17,
	CXCursor_ObjCImplementationDecl: 18,
	CXCursor_ObjCCategoryImplDecl: 19,
	CXCursor_TypedefDecl: 20,
	CXCursor_CXXMethod: 21,
	CXCursor_Namespace: 22,
	CXCursor_LinkageSpec: 23,
	CXCursor_Constructor: 24,
	CXCursor_Destructor: 25,
	CXCursor_ConversionFunction: 26,
	CXCursor_TemplateTypeParameter: 27,
	CXCursor_NonTypeTemplateParameter: 28,
	CXCursor_TemplateTemplateParameter: 29,
	CXCursor_FunctionTemplate: 30,
	CXCursor_ClassTemplate: 31,
	CXCursor_ClassTemplatePartialSpecialization: 32,
	CXCursor_NamespaceAlias: 33,
	CXCursor_UsingDirective: 34,
	CXCursor_UsingDeclaration: 35,
	CXCursor_TypeAliasDecl: 36,
	CXCursor_ObjCSynthesizeDecl: 37,
	CXCursor_ObjCDynamicDecl: 38,
	CXCursor_CXXAccessSpecifier: 39,
	CXCursor_FirstDecl: 1,
	CXCursor_LastDecl: 39,
	CXCursor_FirstRef: 40,
	CXCursor_ObjCSuperClassRef: 40,
	CXCursor_ObjCProtocolRef: 41,
	CXCursor_ObjCClassRef: 42,
	CXCursor_TypeRef: 43,
	CXCursor_CXXBaseSpecifier: 44,
	CXCursor_TemplateRef: 45,
	CXCursor_NamespaceRef: 46,
	CXCursor_MemberRef: 47,
	CXCursor_LabelRef: 48,
	CXCursor_OverloadedDeclRef: 49,
	CXCursor_VariableRef: 50,
	CXCursor_LastRef: 50,
	CXCursor_FirstInvalid: 70,
	CXCursor_InvalidFile: 70,
	CXCursor_NoDeclFound: 71,
	CXCursor_NotImplemented: 72,
	CXCursor_InvalidCode: 73,
	CXCursor_LastInvalid: 73,
	CXCursor_FirstExpr: 100,
	CXCursor_UnexposedExpr: 100,
	CXCursor_DeclRefExpr: 101,
	CXCursor_MemberRefExpr: 102,
	CXCursor_CallExpr: 103,
	CXCursor_ObjCMessageExpr: 104,
	CXCursor_BlockExpr: 105,
	CXCursor_IntegerLiteral: 106,
	CXCursor_FloatingLiteral: 107,
	CXCursor_ImaginaryLiteral: 108,
	CXCursor_StringLiteral: 109,
	CXCursor_CharacterLiteral: 110,
	CXCursor_ParenExpr: 111,
	CXCursor_UnaryOperator: 112,
	CXCursor_ArraySubscriptExpr: 113,
	CXCursor_BinaryOperator: 114,
	CXCursor_CompoundAssignOperator: 115,
	CXCursor_ConditionalOperator: 116,
	CXCursor_CStyleCastExpr: 117,
	CXCursor_CompoundLiteralExpr: 118,
	CXCursor_InitListExpr: 119,
	CXCursor_AddrLabelExpr: 120,
	CXCursor_StmtExpr: 121,
	CXCursor_GenericSelectionExpr: 122,
	CXCursor_GNUNullExpr: 123,
	CXCursor_CXXStaticCastExpr: 124,
	CXCursor_CXXDynamicCastExpr: 125,
	CXCursor_CXXReinterpretCastExpr: 126,
	CXCursor_CXXConstCastExpr: 127,
	CXCursor_CXXFunctionalCastExpr: 128,
	CXCursor_CXXTypeidExpr: 129,
	CXCursor_CXXBoolLiteralExpr: 130,
	CXCursor_CXXNullPtrLiteralExpr: 131,
	CXCursor_CXXThisExpr: 132,
	CXCursor_CXXThrowExpr: 133,
	CXCursor_CXXNewExpr: 134,
	CXCursor_CXXDeleteExpr: 135,
	CXCursor_UnaryExpr: 136,
	CXCursor_ObjCStringLiteral: 137,
	CXCursor_ObjCEncodeExpr: 138,
	CXCursor_ObjCSelectorExpr: 139,
	CXCursor_ObjCProtocolExpr: 140,
	CXCursor_ObjCBridgedCastExpr: 141,
	CXCursor_PackExpansionExpr: 142,
	CXCursor_SizeOfPackExpr: 143,
	CXCursor_LambdaExpr: 144,
	CXCursor_ObjCBoolLiteralExpr: 145,
	CXCursor_ObjCSelfExpr: 146,
	CXCursor_OMPArraySectionExpr: 147,
	CXCursor_LastExpr: 147,
	CXCursor_FirstStmt: 200,
	CXCursor_UnexposedStmt: 200,
	CXCursor_LabelStmt: 201,
	CXCursor_CompoundStmt: 202,
	CXCursor_CaseStmt: 203,
	CXCursor_DefaultStmt: 204,
	CXCursor_IfStmt: 205,
	CXCursor_SwitchStmt: 206,
	CXCursor_WhileStmt: 207,
	CXCursor_DoStmt: 208,
	CXCursor_ForStmt: 209,
	CXCursor_GotoStmt: 210,
	CXCursor_IndirectGotoStmt: 211,
	CXCursor_ContinueStmt: 212,
	CXCursor_BreakStmt: 213,
	CXCursor_ReturnStmt: 214,
	CXCursor_GCCAsmStmt: 215,
	CXCursor_AsmStmt: 215,
	CXCursor_ObjCAtTryStmt: 216,
	CXCursor_ObjCAtCatchStmt: 217,
	CXCursor_ObjCAtFinallyStmt: 218,
	CXCursor_ObjCAtThrowStmt: 219,
	CXCursor_ObjCAtSynchronizedStmt: 220,
	CXCursor_ObjCAutoreleasePoolStmt: 221,
	CXCursor_ObjCForCollectionStmt: 222,
	CXCursor_CXXCatchStmt: 223,
	CXCursor_CXXTryStmt: 224,
	CXCursor_CXXForRangeStmt: 225,
	CXCursor_SEHTryStmt: 226,
	CXCursor_SEHExceptStmt: 227,
	CXCursor_SEHFinallyStmt: 228,
	CXCursor_MSAsmStmt: 229,
	CXCursor_NullStmt: 230,
	CXCursor_DeclStmt: 231,
	CXCursor_OMPParallelDirective: 232,
	CXCursor_OMPSimdDirective: 233,
	CXCursor_OMPForDirective: 234,
	CXCursor_OMPSectionsDirective: 235,
	CXCursor_OMPSectionDirective: 236,
	CXCursor_OMPSingleDirective: 237,
	CXCursor_OMPParallelForDirective: 238,
	CXCursor_OMPParallelSectionsDirective: 239,
	CXCursor_OMPTaskDirective: 240,
	CXCursor_OMPMasterDirective: 241,
	CXCursor_OMPCriticalDirective: 242,
	CXCursor_OMPTaskyieldDirective: 243,
	CXCursor_OMPBarrierDirective: 244,
	CXCursor_OMPTaskwaitDirective: 245,
	CXCursor_OMPFlushDirective: 246,
	CXCursor_SEHLeaveStmt: 247,
	CXCursor_OMPOrderedDirective: 248,
	CXCursor_OMPAtomicDirective: 249,
	CXCursor_OMPForSimdDirective: 250,
	CXCursor_OMPParallelForSimdDirective: 251,
	CXCursor_OMPTargetDirective: 252,
	CXCursor_OMPTeamsDirective: 253,
	CXCursor_OMPTaskgroupDirective: 254,
	CXCursor_OMPCancellationPointDirective: 255,
	CXCursor_OMPCancelDirective: 256,
	CXCursor_OMPTargetDataDirective: 257,
	CXCursor_OMPTaskLoopDirective: 258,
	CXCursor_OMPTaskLoopSimdDirective: 259,
	CXCursor_OMPDistributeDirective: 260,
	CXCursor_LastStmt: 260,
	CXCursor_TranslationUnit: 300,
	CXCursor_FirstAttr: 400,
	CXCursor_UnexposedAttr: 400,
	CXCursor_IBActionAttr: 401,
	CXCursor_IBOutletAttr: 402,
	CXCursor_IBOutletCollectionAttr: 403,
	CXCursor_CXXFinalAttr: 404,
	CXCursor_CXXOverrideAttr: 405,
	CXCursor_AnnotateAttr: 406,
	CXCursor_AsmLabelAttr: 407,
	CXCursor_PackedAttr: 408,
	CXCursor_PureAttr: 409,
	CXCursor_ConstAttr: 410,
	CXCursor_NoDuplicateAttr: 411,
	CXCursor_CUDAConstantAttr: 412,
	CXCursor_CUDADeviceAttr: 413,
	CXCursor_CUDAGlobalAttr: 414,
	CXCursor_CUDAHostAttr: 415,
	CXCursor_CUDASharedAttr: 416,
	CXCursor_VisibilityAttr: 417,
	CXCursor_DLLExport: 418,
	CXCursor_DLLImport: 419,
	CXCursor_LastAttr: 419,
	CXCursor_PreprocessingDirective: 500,
	CXCursor_MacroDefinition: 501,
	CXCursor_MacroExpansion: 502,
	CXCursor_MacroInstantiation: 502,
	CXCursor_InclusionDirective: 503,
	CXCursor_FirstPreprocessing: 500,
	CXCursor_LastPreprocessing: 503,
	CXCursor_ModuleImportDecl: 600,
	CXCursor_TypeAliasTemplateDecl: 601,
	CXCursor_FirstExtraDecl: 600,
	CXCursor_LastExtraDecl: 601,
	CXCursor_OverloadCandidate: 700,
}
var CXLinkageKind = exports.CXLinkageKind = {
	CXLinkage_Invalid: 0,
	CXLinkage_NoLinkage: 1,
	CXLinkage_Internal: 2,
	CXLinkage_UniqueExternal: 3,
	CXLinkage_External: 4,
}
var CXVisibilityKind = exports.CXVisibilityKind = {
	CXVisibility_Invalid: 0,
	CXVisibility_Hidden: 1,
	CXVisibility_Protected: 2,
	CXVisibility_Default: 3,
}
var CXLanguageKind = exports.CXLanguageKind = {
	CXLanguage_Invalid: 0,
	CXLanguage_C: 1,
	CXLanguage_ObjC: 2,
	CXLanguage_CPlusPlus: 3,
}
var CXTypeKind = exports.CXTypeKind = {
	CXType_Invalid: 0,
	CXType_Unexposed: 1,
	CXType_Void: 2,
	CXType_Bool: 3,
	CXType_Char_U: 4,
	CXType_UChar: 5,
	CXType_Char16: 6,
	CXType_Char32: 7,
	CXType_UShort: 8,
	CXType_UInt: 9,
	CXType_ULong: 10,
	CXType_ULongLong: 11,
	CXType_UInt128: 12,
	CXType_Char_S: 13,
	CXType_SChar: 14,
	CXType_WChar: 15,
	CXType_Short: 16,
	CXType_Int: 17,
	CXType_Long: 18,
	CXType_LongLong: 19,
	CXType_Int128: 20,
	CXType_Float: 21,
	CXType_Double: 22,
	CXType_LongDouble: 23,
	CXType_NullPtr: 24,
	CXType_Overload: 25,
	CXType_Dependent: 26,
	CXType_ObjCId: 27,
	CXType_ObjCClass: 28,
	CXType_ObjCSel: 29,
	CXType_FirstBuiltin: 2,
	CXType_LastBuiltin: 29,
	CXType_Complex: 100,
	CXType_Pointer: 101,
	CXType_BlockPointer: 102,
	CXType_LValueReference: 103,
	CXType_RValueReference: 104,
	CXType_Record: 105,
	CXType_Enum: 106,
	CXType_Typedef: 107,
	CXType_ObjCInterface: 108,
	CXType_ObjCObjectPointer: 109,
	CXType_FunctionNoProto: 110,
	CXType_FunctionProto: 111,
	CXType_ConstantArray: 112,
	CXType_Vector: 113,
	CXType_IncompleteArray: 114,
	CXType_VariableArray: 115,
	CXType_DependentSizedArray: 116,
	CXType_MemberPointer: 117,
	CXType_Auto: 118,
}
var CXCallingConv = exports.CXCallingConv = {
	CXCallingConv_Default: 0,
	CXCallingConv_C: 1,
	CXCallingConv_X86StdCall: 2,
	CXCallingConv_X86FastCall: 3,
	CXCallingConv_X86ThisCall: 4,
	CXCallingConv_X86Pascal: 5,
	CXCallingConv_AAPCS: 6,
	CXCallingConv_AAPCS_VFP: 7,
	CXCallingConv_IntelOclBicc: 9,
	CXCallingConv_X86_64Win64: 10,
	CXCallingConv_X86_64SysV: 11,
	CXCallingConv_X86VectorCall: 12,
	CXCallingConv_Invalid: 100,
	CXCallingConv_Unexposed: 200,
}
var CXTemplateArgumentKind = exports.CXTemplateArgumentKind = {
	CXTemplateArgumentKind_Null: 0,
	CXTemplateArgumentKind_Type: 1,
	CXTemplateArgumentKind_Declaration: 2,
	CXTemplateArgumentKind_NullPtr: 3,
	CXTemplateArgumentKind_Integral: 4,
	CXTemplateArgumentKind_Template: 5,
	CXTemplateArgumentKind_TemplateExpansion: 6,
	CXTemplateArgumentKind_Expression: 7,
	CXTemplateArgumentKind_Pack: 8,
	CXTemplateArgumentKind_Invalid: 9,
}
var CXTypeLayoutError = exports.CXTypeLayoutError = {
	CXTypeLayoutError_Invalid: -1,
	CXTypeLayoutError_Incomplete: -2,
	CXTypeLayoutError_Dependent: -3,
	CXTypeLayoutError_NotConstantSize: -4,
	CXTypeLayoutError_InvalidFieldName: -5,
}
var CXRefQualifierKind = exports.CXRefQualifierKind = {
	CXRefQualifier_None: 0,
	CXRefQualifier_LValue: 1,
	CXRefQualifier_RValue: 2,
}
var CX_CXXAccessSpecifier = exports.CX_CXXAccessSpecifier = {
	CX_CXXInvalidAccessSpecifier: 0,
	CX_CXXPublic: 1,
	CX_CXXProtected: 2,
	CX_CXXPrivate: 3,
}
var CX_StorageClass = exports.CX_StorageClass = {
	CX_SC_Invalid: 0,
	CX_SC_None: 1,
	CX_SC_Extern: 2,
	CX_SC_Static: 3,
	CX_SC_PrivateExtern: 4,
	CX_SC_OpenCLWorkGroupLocal: 5,
	CX_SC_Auto: 6,
	CX_SC_Register: 7,
}
var CXChildVisitResult = exports.CXChildVisitResult = {
	CXChildVisit_Break: 0,
	CXChildVisit_Continue: 1,
	CXChildVisit_Recurse: 2,
}
var CXObjCPropertyAttrKind = exports.CXObjCPropertyAttrKind = {
	CXObjCPropertyAttr_noattr: 0,
	CXObjCPropertyAttr_readonly: 1,
	CXObjCPropertyAttr_getter: 2,
	CXObjCPropertyAttr_assign: 4,
	CXObjCPropertyAttr_readwrite: 8,
	CXObjCPropertyAttr_retain: 16,
	CXObjCPropertyAttr_copy: 32,
	CXObjCPropertyAttr_nonatomic: 64,
	CXObjCPropertyAttr_setter: 128,
	CXObjCPropertyAttr_atomic: 256,
	CXObjCPropertyAttr_weak: 512,
	CXObjCPropertyAttr_strong: 1024,
	CXObjCPropertyAttr_unsafe_unretained: 2048,
}
var CXObjCDeclQualifierKind = exports.CXObjCDeclQualifierKind = {
	CXObjCDeclQualifier_None: 0,
	CXObjCDeclQualifier_In: 1,
	CXObjCDeclQualifier_Inout: 2,
	CXObjCDeclQualifier_Out: 4,
	CXObjCDeclQualifier_Bycopy: 8,
	CXObjCDeclQualifier_Byref: 16,
	CXObjCDeclQualifier_Oneway: 32,
}
var CXNameRefFlags = exports.CXNameRefFlags = {
	CXNameRange_WantQualifier: 1,
	CXNameRange_WantTemplateArgs: 2,
	CXNameRange_WantSinglePiece: 4,
}
var CXTokenKind = exports.CXTokenKind = {
	CXToken_Punctuation: 0,
	CXToken_Keyword: 1,
	CXToken_Identifier: 2,
	CXToken_Literal: 3,
	CXToken_Comment: 4,
}
var CXCompletionChunkKind = exports.CXCompletionChunkKind = {
	CXCompletionChunk_Optional: 0,
	CXCompletionChunk_TypedText: 1,
	CXCompletionChunk_Text: 2,
	CXCompletionChunk_Placeholder: 3,
	CXCompletionChunk_Informative: 4,
	CXCompletionChunk_CurrentParameter: 5,
	CXCompletionChunk_LeftParen: 6,
	CXCompletionChunk_RightParen: 7,
	CXCompletionChunk_LeftBracket: 8,
	CXCompletionChunk_RightBracket: 9,
	CXCompletionChunk_LeftBrace: 10,
	CXCompletionChunk_RightBrace: 11,
	CXCompletionChunk_LeftAngle: 12,
	CXCompletionChunk_RightAngle: 13,
	CXCompletionChunk_Comma: 14,
	CXCompletionChunk_ResultType: 15,
	CXCompletionChunk_Colon: 16,
	CXCompletionChunk_SemiColon: 17,
	CXCompletionChunk_Equal: 18,
	CXCompletionChunk_HorizontalSpace: 19,
	CXCompletionChunk_VerticalSpace: 20,
}
var CXCodeComplete_Flags = exports.CXCodeComplete_Flags = {
	CXCodeComplete_IncludeMacros: 1,
	CXCodeComplete_IncludeCodePatterns: 2,
	CXCodeComplete_IncludeBriefComments: 4,
}
var CXCompletionContext = exports.CXCompletionContext = {
	CXCompletionContext_Unexposed: 0,
	CXCompletionContext_AnyType: 1,
	CXCompletionContext_AnyValue: 2,
	CXCompletionContext_ObjCObjectValue: 4,
	CXCompletionContext_ObjCSelectorValue: 8,
	CXCompletionContext_CXXClassTypeValue: 16,
	CXCompletionContext_DotMemberAccess: 32,
	CXCompletionContext_ArrowMemberAccess: 64,
	CXCompletionContext_ObjCPropertyAccess: 128,
	CXCompletionContext_EnumTag: 256,
	CXCompletionContext_UnionTag: 512,
	CXCompletionContext_StructTag: 1024,
	CXCompletionContext_ClassTag: 2048,
	CXCompletionContext_Namespace: 4096,
	CXCompletionContext_NestedNameSpecifier: 8192,
	CXCompletionContext_ObjCInterface: 16384,
	CXCompletionContext_ObjCProtocol: 32768,
	CXCompletionContext_ObjCCategory: 65536,
	CXCompletionContext_ObjCInstanceMessage: 131072,
	CXCompletionContext_ObjCClassMessage: 262144,
	CXCompletionContext_ObjCSelectorName: 524288,
	CXCompletionContext_MacroName: 1048576,
	CXCompletionContext_NaturalLanguage: 2097152,
	CXCompletionContext_Unknown: 4194303,
}
var CXVisitorResult = exports.CXVisitorResult = {
	CXVisit_Break: 0,
	CXVisit_Continue: 1,
}
var CXResult = exports.CXResult = {
	CXResult_Success: 0,
	CXResult_Invalid: 1,
	CXResult_VisitBreak: 2,
}
var CXIdxEntityKind = exports.CXIdxEntityKind = {
	CXIdxEntity_Unexposed: 0,
	CXIdxEntity_Typedef: 1,
	CXIdxEntity_Function: 2,
	CXIdxEntity_Variable: 3,
	CXIdxEntity_Field: 4,
	CXIdxEntity_EnumConstant: 5,
	CXIdxEntity_ObjCClass: 6,
	CXIdxEntity_ObjCProtocol: 7,
	CXIdxEntity_ObjCCategory: 8,
	CXIdxEntity_ObjCInstanceMethod: 9,
	CXIdxEntity_ObjCClassMethod: 10,
	CXIdxEntity_ObjCProperty: 11,
	CXIdxEntity_ObjCIvar: 12,
	CXIdxEntity_Enum: 13,
	CXIdxEntity_Struct: 14,
	CXIdxEntity_Union: 15,
	CXIdxEntity_CXXClass: 16,
	CXIdxEntity_CXXNamespace: 17,
	CXIdxEntity_CXXNamespaceAlias: 18,
	CXIdxEntity_CXXStaticVariable: 19,
	CXIdxEntity_CXXStaticMethod: 20,
	CXIdxEntity_CXXInstanceMethod: 21,
	CXIdxEntity_CXXConstructor: 22,
	CXIdxEntity_CXXDestructor: 23,
	CXIdxEntity_CXXConversionFunction: 24,
	CXIdxEntity_CXXTypeAlias: 25,
	CXIdxEntity_CXXInterface: 26,
}
var CXIdxEntityLanguage = exports.CXIdxEntityLanguage = {
	CXIdxEntityLang_None: 0,
	CXIdxEntityLang_C: 1,
	CXIdxEntityLang_ObjC: 2,
	CXIdxEntityLang_CXX: 3,
}
var CXIdxEntityCXXTemplateKind = exports.CXIdxEntityCXXTemplateKind = {
	CXIdxEntity_NonTemplate: 0,
	CXIdxEntity_Template: 1,
	CXIdxEntity_TemplatePartialSpecialization: 2,
	CXIdxEntity_TemplateSpecialization: 3,
}
var CXIdxAttrKind = exports.CXIdxAttrKind = {
	CXIdxAttr_Unexposed: 0,
	CXIdxAttr_IBAction: 1,
	CXIdxAttr_IBOutlet: 2,
	CXIdxAttr_IBOutletCollection: 3,
}
var CXIdxDeclInfoFlags = exports.CXIdxDeclInfoFlags = {
	CXIdxDeclFlag_Skipped: 1,
}
var CXIdxObjCContainerKind = exports.CXIdxObjCContainerKind = {
	CXIdxObjCContainer_ForwardRef: 0,
	CXIdxObjCContainer_Interface: 1,
	CXIdxObjCContainer_Implementation: 2,
}
var CXIdxEntityRefKind = exports.CXIdxEntityRefKind = {
	CXIdxEntityRef_Direct: 1,
	CXIdxEntityRef_Implicit: 2,
}
var CXIndexOptFlags = exports.CXIndexOptFlags = {
	CXIndexOpt_None: 0,
	CXIndexOpt_SuppressRedundantRefs: 1,
	CXIndexOpt_IndexFunctionLocalSymbols: 2,
	CXIndexOpt_IndexImplicitTemplateInstantiations: 4,
	CXIndexOpt_SuppressWarnings: 8,
	CXIndexOpt_SkipParsedBodiesInSession: 16,
}

var voit = exports.voit = ref.types.void
var voit_ptr = exports.voit_ptr = ref.refType(voit)
var CXIndex = exports.CXIndex = voit_ptr
var CXTranslationUnitImpl = exports.CXTranslationUnitImpl = Struct({
})
var CXTranslationUnitImpl_ptr = exports.CXTranslationUnitImpl_ptr = ref.refType(CXTranslationUnitImpl)
var CXTranslationUnit = exports.CXTranslationUnit = CXTranslationUnitImpl_ptr
var CXClientData = exports.CXClientData = voit_ptr
var string = exports.string = ref.types.CString
var ulong = exports.ulong = ref.types.ulong
var CXUnsavedFile = exports.CXUnsavedFile = Struct({
	Filename: string,
	Contents: string,
	Length: ulong,
})
var uint32 = exports.uint32 = ref.types.uint32
var int32 = exports.int32 = ref.types.int32
var CXVersion = exports.CXVersion = Struct({
	Major: int32,
	Minor: int32,
	Subminor: int32,
})
var CXFile = exports.CXFile = voit_ptr
var CXString = CXString_lib.CXString
var long = exports.long = ref.types.long
var time_t = exports.time_t = long
var ulonglong = exports.ulonglong = ref.types.ulonglong
var c__SA_CXFileUniqueID_FI_data_arr = ArrayType(ulonglong, 3)
var c__SA_CXFileUniqueID = exports.c__SA_CXFileUniqueID = Struct({
	data: c__SA_CXFileUniqueID_FI_data_arr,
})
var CXFileUniqueID = exports.CXFileUniqueID = c__SA_CXFileUniqueID
var CXFileUniqueID_ptr = exports.CXFileUniqueID_ptr = ref.refType(CXFileUniqueID)
var c__SA_CXSourceLocation_FI_ptr_data_arr = ArrayType(voit_ptr, 2)
var c__SA_CXSourceLocation = exports.c__SA_CXSourceLocation = Struct({
	ptr_data: c__SA_CXSourceLocation_FI_ptr_data_arr,
	int_data: uint32,
})
var CXSourceLocation = exports.CXSourceLocation = c__SA_CXSourceLocation
var c__SA_CXSourceRange_FI_ptr_data_arr = ArrayType(voit_ptr, 2)
var c__SA_CXSourceRange = exports.c__SA_CXSourceRange = Struct({
	ptr_data: c__SA_CXSourceRange_FI_ptr_data_arr,
	begin_int_data: uint32,
	end_int_data: uint32,
})
var CXSourceRange = exports.CXSourceRange = c__SA_CXSourceRange
var CXFile_ptr = exports.CXFile_ptr = ref.refType(CXFile)
var uint32_ptr = exports.uint32_ptr = ref.refType(uint32)
var CXString_ptr = exports.CXString_ptr = ref.refType(CXString)
var CXSourceRange_ptr = exports.CXSourceRange_ptr = ref.refType(CXSourceRange)
var c__SA_CXSourceRangeList = exports.c__SA_CXSourceRangeList = Struct({
	count: uint32,
	ranges: CXSourceRange_ptr,
})
var CXSourceRangeList = exports.CXSourceRangeList = c__SA_CXSourceRangeList
var CXSourceRangeList_ptr = exports.CXSourceRangeList_ptr = ref.refType(CXSourceRangeList)
var CXDiagnostic = exports.CXDiagnostic = voit_ptr
var CXDiagnosticSet = exports.CXDiagnosticSet = voit_ptr
var string_ptr = exports.string_ptr = ref.refType(string)
var CXUnsavedFile_ptr = exports.CXUnsavedFile_ptr = ref.refType(CXUnsavedFile)
var CXTranslationUnit_ptr = exports.CXTranslationUnit_ptr = ref.refType(CXTranslationUnit)
var CXTUResourceUsageEntry = exports.CXTUResourceUsageEntry = Struct({
	kind: uint32,
	amount: ulong,
})
var CXTUResourceUsageEntry_ptr = exports.CXTUResourceUsageEntry_ptr = ref.refType(CXTUResourceUsageEntry)
var CXTUResourceUsage = exports.CXTUResourceUsage = Struct({
	data: voit_ptr,
	numEntries: uint32,
	entries: CXTUResourceUsageEntry_ptr,
})
var c__SA_CXCursor_FI_data_arr = ArrayType(voit_ptr, 3)
var c__SA_CXCursor = exports.c__SA_CXCursor = Struct({
	kind: uint32,
	xdata: int32,
	data: c__SA_CXCursor_FI_data_arr,
})
var CXCursor = exports.CXCursor = c__SA_CXCursor
var CXPlatformAvailability = exports.CXPlatformAvailability = Struct({
	Platform: CXString,
	Introduced: CXVersion,
	Deprecated: CXVersion,
	Obsoleted: CXVersion,
	Unavailable: int32,
	Message: CXString,
})
var int32_ptr = exports.int32_ptr = ref.refType(int32)
var CXPlatformAvailability_ptr = exports.CXPlatformAvailability_ptr = ref.refType(CXPlatformAvailability)
var CXCursorSetImpl = exports.CXCursorSetImpl = Struct({
})
var CXCursorSetImpl_ptr = exports.CXCursorSetImpl_ptr = ref.refType(CXCursorSetImpl)
var CXCursorSet = exports.CXCursorSet = CXCursorSetImpl_ptr
var CXCursor_ptr = exports.CXCursor_ptr = ref.refType(CXCursor)
var CXCursor_ptr_ptr = exports.CXCursor_ptr_ptr = ref.refType(CXCursor_ptr)
var c__SA_CXType_FI_data_arr = ArrayType(voit_ptr, 2)
var c__SA_CXType = exports.c__SA_CXType = Struct({
	kind: uint32,
	data: c__SA_CXType_FI_data_arr,
})
var CXType = exports.CXType = c__SA_CXType
var longlong = exports.longlong = ref.types.longlong
var CXCursorVisitor = FFI.Function( uint32, [ c__SA_CXCursor, c__SA_CXCursor, voit_ptr, ] )
var CXCursorVisitorBlock = exports.CXCursorVisitorBlock = voit
var CXStringSet = CXString_lib.CXStringSet
var CXStringSet_ptr = exports.CXStringSet_ptr = ref.refType(CXStringSet)
var CXModule = exports.CXModule = voit_ptr
var c__SA_CXToken_FI_int_data_arr = ArrayType(uint32, 4)
var c__SA_CXToken = exports.c__SA_CXToken = Struct({
	int_data: c__SA_CXToken_FI_int_data_arr,
	ptr_data: voit_ptr,
})
var CXToken = exports.CXToken = c__SA_CXToken
var CXToken_ptr = exports.CXToken_ptr = ref.refType(CXToken)
var CXToken_ptr_ptr = exports.CXToken_ptr_ptr = ref.refType(CXToken_ptr)
var CXCompletionString = exports.CXCompletionString = voit_ptr
var c__SA_CXCompletionResult = exports.c__SA_CXCompletionResult = Struct({
	CursorKind: uint32,
	CompletionString: CXCompletionString,
})
var CXCompletionResult = exports.CXCompletionResult = c__SA_CXCompletionResult
var CXCompletionResult_ptr = exports.CXCompletionResult_ptr = ref.refType(CXCompletionResult)
var c__SA_CXCodeCompleteResults = exports.c__SA_CXCodeCompleteResults = Struct({
	Results: CXCompletionResult_ptr,
	NumResults: uint32,
})
var CXCodeCompleteResults = exports.CXCodeCompleteResults = c__SA_CXCodeCompleteResults
var CXCodeCompleteResults_ptr = exports.CXCodeCompleteResults_ptr = ref.refType(CXCodeCompleteResults)
var c__SA_CXSourceLocation_ptr = exports.c__SA_CXSourceLocation_ptr = ref.refType(c__SA_CXSourceLocation)
var CXInclusionVisitor = FFI.Function( voit, [ voit_ptr, c__SA_CXSourceLocation_ptr, uint32, voit_ptr, ] )
var CXRemapping = exports.CXRemapping = voit_ptr
var c__SA_CXCursorAndRangeVisitor = exports.c__SA_CXCursorAndRangeVisitor = Struct({
	context: voit_ptr,
	visit: voit_ptr,
})
var CXCursorAndRangeVisitor = exports.CXCursorAndRangeVisitor = c__SA_CXCursorAndRangeVisitor
var CXCursorAndRangeVisitorBlock = exports.CXCursorAndRangeVisitorBlock = voit
var CXIdxClientFile = exports.CXIdxClientFile = voit_ptr
var CXIdxClientEntity = exports.CXIdxClientEntity = voit_ptr
var CXIdxClientContainer = exports.CXIdxClientContainer = voit_ptr
var CXIdxClientASTFile = exports.CXIdxClientASTFile = voit_ptr
var c__SA_CXIdxLoc_FI_ptr_data_arr = ArrayType(voit_ptr, 2)
var c__SA_CXIdxLoc = exports.c__SA_CXIdxLoc = Struct({
	ptr_data: c__SA_CXIdxLoc_FI_ptr_data_arr,
	int_data: uint32,
})
var CXIdxLoc = exports.CXIdxLoc = c__SA_CXIdxLoc
var c__SA_CXIdxIncludedFileInfo = exports.c__SA_CXIdxIncludedFileInfo = Struct({
	hashLoc: CXIdxLoc,
	filename: string,
	file: CXFile,
	isImport: int32,
	isAngled: int32,
	isModuleImport: int32,
})
var CXIdxIncludedFileInfo = exports.CXIdxIncludedFileInfo = c__SA_CXIdxIncludedFileInfo
var c__SA_CXIdxImportedASTFileInfo = exports.c__SA_CXIdxImportedASTFileInfo = Struct({
	file: CXFile,
	module: CXModule,
	loc: CXIdxLoc,
	isImplicit: int32,
})
var CXIdxImportedASTFileInfo = exports.CXIdxImportedASTFileInfo = c__SA_CXIdxImportedASTFileInfo
var c__SA_CXIdxAttrInfo = exports.c__SA_CXIdxAttrInfo = Struct({
	kind: uint32,
	cursor: CXCursor,
	loc: CXIdxLoc,
})
var CXIdxAttrInfo = exports.CXIdxAttrInfo = c__SA_CXIdxAttrInfo
var CXIdxAttrInfo_ptr = exports.CXIdxAttrInfo_ptr = ref.refType(CXIdxAttrInfo)
var CXIdxAttrInfo_ptr_ptr = exports.CXIdxAttrInfo_ptr_ptr = ref.refType(CXIdxAttrInfo_ptr)
var c__SA_CXIdxEntityInfo = exports.c__SA_CXIdxEntityInfo = Struct({
	kind: uint32,
	templateKind: uint32,
	lang: uint32,
	name: string,
	USR: string,
	cursor: CXCursor,
	attributes: CXIdxAttrInfo_ptr_ptr,
	numAttributes: uint32,
})
var CXIdxEntityInfo = exports.CXIdxEntityInfo = c__SA_CXIdxEntityInfo
var c__SA_CXIdxContainerInfo = exports.c__SA_CXIdxContainerInfo = Struct({
	cursor: CXCursor,
})
var CXIdxContainerInfo = exports.CXIdxContainerInfo = c__SA_CXIdxContainerInfo
var CXIdxEntityInfo_ptr = exports.CXIdxEntityInfo_ptr = ref.refType(CXIdxEntityInfo)
var c__SA_CXIdxIBOutletCollectionAttrInfo = exports.c__SA_CXIdxIBOutletCollectionAttrInfo = Struct({
	attrInfo: CXIdxAttrInfo_ptr,
	objcClass: CXIdxEntityInfo_ptr,
	classCursor: CXCursor,
	classLoc: CXIdxLoc,
})
var CXIdxIBOutletCollectionAttrInfo = exports.CXIdxIBOutletCollectionAttrInfo = c__SA_CXIdxIBOutletCollectionAttrInfo
var CXIdxContainerInfo_ptr = exports.CXIdxContainerInfo_ptr = ref.refType(CXIdxContainerInfo)
var c__SA_CXIdxDeclInfo = exports.c__SA_CXIdxDeclInfo = Struct({
	entityInfo: CXIdxEntityInfo_ptr,
	cursor: CXCursor,
	loc: CXIdxLoc,
	semanticContainer: CXIdxContainerInfo_ptr,
	lexicalContainer: CXIdxContainerInfo_ptr,
	isRedeclaration: int32,
	isDefinition: int32,
	isContainer: int32,
	declAsContainer: CXIdxContainerInfo_ptr,
	isImplicit: int32,
	attributes: CXIdxAttrInfo_ptr_ptr,
	numAttributes: uint32,
	flags: uint32,
})
var CXIdxDeclInfo = exports.CXIdxDeclInfo = c__SA_CXIdxDeclInfo
var CXIdxDeclInfo_ptr = exports.CXIdxDeclInfo_ptr = ref.refType(CXIdxDeclInfo)
var c__SA_CXIdxObjCContainerDeclInfo = exports.c__SA_CXIdxObjCContainerDeclInfo = Struct({
	declInfo: CXIdxDeclInfo_ptr,
	kind: uint32,
})
var CXIdxObjCContainerDeclInfo = exports.CXIdxObjCContainerDeclInfo = c__SA_CXIdxObjCContainerDeclInfo
var c__SA_CXIdxBaseClassInfo = exports.c__SA_CXIdxBaseClassInfo = Struct({
	base: CXIdxEntityInfo_ptr,
	cursor: CXCursor,
	loc: CXIdxLoc,
})
var CXIdxBaseClassInfo = exports.CXIdxBaseClassInfo = c__SA_CXIdxBaseClassInfo
var c__SA_CXIdxObjCProtocolRefInfo = exports.c__SA_CXIdxObjCProtocolRefInfo = Struct({
	protocol: CXIdxEntityInfo_ptr,
	cursor: CXCursor,
	loc: CXIdxLoc,
})
var CXIdxObjCProtocolRefInfo = exports.CXIdxObjCProtocolRefInfo = c__SA_CXIdxObjCProtocolRefInfo
var CXIdxObjCProtocolRefInfo_ptr = exports.CXIdxObjCProtocolRefInfo_ptr = ref.refType(CXIdxObjCProtocolRefInfo)
var CXIdxObjCProtocolRefInfo_ptr_ptr = exports.CXIdxObjCProtocolRefInfo_ptr_ptr = ref.refType(CXIdxObjCProtocolRefInfo_ptr)
var c__SA_CXIdxObjCProtocolRefListInfo = exports.c__SA_CXIdxObjCProtocolRefListInfo = Struct({
	protocols: CXIdxObjCProtocolRefInfo_ptr_ptr,
	numProtocols: uint32,
})
var CXIdxObjCProtocolRefListInfo = exports.CXIdxObjCProtocolRefListInfo = c__SA_CXIdxObjCProtocolRefListInfo
var CXIdxObjCContainerDeclInfo_ptr = exports.CXIdxObjCContainerDeclInfo_ptr = ref.refType(CXIdxObjCContainerDeclInfo)
var CXIdxBaseClassInfo_ptr = exports.CXIdxBaseClassInfo_ptr = ref.refType(CXIdxBaseClassInfo)
var CXIdxObjCProtocolRefListInfo_ptr = exports.CXIdxObjCProtocolRefListInfo_ptr = ref.refType(CXIdxObjCProtocolRefListInfo)
var c__SA_CXIdxObjCInterfaceDeclInfo = exports.c__SA_CXIdxObjCInterfaceDeclInfo = Struct({
	containerInfo: CXIdxObjCContainerDeclInfo_ptr,
	superInfo: CXIdxBaseClassInfo_ptr,
	protocols: CXIdxObjCProtocolRefListInfo_ptr,
})
var CXIdxObjCInterfaceDeclInfo = exports.CXIdxObjCInterfaceDeclInfo = c__SA_CXIdxObjCInterfaceDeclInfo
var c__SA_CXIdxObjCCategoryDeclInfo = exports.c__SA_CXIdxObjCCategoryDeclInfo = Struct({
	containerInfo: CXIdxObjCContainerDeclInfo_ptr,
	objcClass: CXIdxEntityInfo_ptr,
	classCursor: CXCursor,
	classLoc: CXIdxLoc,
	protocols: CXIdxObjCProtocolRefListInfo_ptr,
})
var CXIdxObjCCategoryDeclInfo = exports.CXIdxObjCCategoryDeclInfo = c__SA_CXIdxObjCCategoryDeclInfo
var c__SA_CXIdxObjCPropertyDeclInfo = exports.c__SA_CXIdxObjCPropertyDeclInfo = Struct({
	declInfo: CXIdxDeclInfo_ptr,
	getter: CXIdxEntityInfo_ptr,
	setter: CXIdxEntityInfo_ptr,
})
var CXIdxObjCPropertyDeclInfo = exports.CXIdxObjCPropertyDeclInfo = c__SA_CXIdxObjCPropertyDeclInfo
var CXIdxBaseClassInfo_ptr_ptr = exports.CXIdxBaseClassInfo_ptr_ptr = ref.refType(CXIdxBaseClassInfo_ptr)
var c__SA_CXIdxCXXClassDeclInfo = exports.c__SA_CXIdxCXXClassDeclInfo = Struct({
	declInfo: CXIdxDeclInfo_ptr,
	bases: CXIdxBaseClassInfo_ptr_ptr,
	numBases: uint32,
})
var CXIdxCXXClassDeclInfo = exports.CXIdxCXXClassDeclInfo = c__SA_CXIdxCXXClassDeclInfo
var c__SA_CXIdxEntityRefInfo = exports.c__SA_CXIdxEntityRefInfo = Struct({
	kind: uint32,
	cursor: CXCursor,
	loc: CXIdxLoc,
	referencedEntity: CXIdxEntityInfo_ptr,
	parentEntity: CXIdxEntityInfo_ptr,
	container: CXIdxContainerInfo_ptr,
})
var CXIdxEntityRefInfo = exports.CXIdxEntityRefInfo = c__SA_CXIdxEntityRefInfo
var c__SA_IndexerCallbacks = exports.c__SA_IndexerCallbacks = Struct({
	abortQuery: voit_ptr,
	diagnostic: voit_ptr,
	enteredMainFile: voit_ptr,
	ppIncludedFile: voit_ptr,
	importedASTFile: voit_ptr,
	startedTranslationUnit: voit_ptr,
	indexDeclaration: voit_ptr,
	indexEntityReference: voit_ptr,
})
var IndexerCallbacks = exports.IndexerCallbacks = c__SA_IndexerCallbacks
var CXIdxObjCInterfaceDeclInfo_ptr = exports.CXIdxObjCInterfaceDeclInfo_ptr = ref.refType(CXIdxObjCInterfaceDeclInfo)
var CXIdxObjCCategoryDeclInfo_ptr = exports.CXIdxObjCCategoryDeclInfo_ptr = ref.refType(CXIdxObjCCategoryDeclInfo)
var CXIdxObjCPropertyDeclInfo_ptr = exports.CXIdxObjCPropertyDeclInfo_ptr = ref.refType(CXIdxObjCPropertyDeclInfo)
var CXIdxIBOutletCollectionAttrInfo_ptr = exports.CXIdxIBOutletCollectionAttrInfo_ptr = ref.refType(CXIdxIBOutletCollectionAttrInfo)
var CXIdxCXXClassDeclInfo_ptr = exports.CXIdxCXXClassDeclInfo_ptr = ref.refType(CXIdxCXXClassDeclInfo)
var CXIndexAction = exports.CXIndexAction = voit_ptr
var IndexerCallbacks_ptr = exports.IndexerCallbacks_ptr = ref.refType(IndexerCallbacks)
var CXIdxClientFile_ptr = exports.CXIdxClientFile_ptr = ref.refType(CXIdxClientFile)
var CXFieldVisitor = FFI.Function( uint32, [ c__SA_CXCursor, voit_ptr, ] )

FFI.Library(__dirname + '/libclang', {
	clang_createIndex: [ CXIndex, [ int32, int32, ] ],
	clang_disposeIndex: [ voit, [ CXIndex, ] ],
	clang_CXIndex_setGlobalOptions: [ voit, [ CXIndex, uint32, ] ],
	clang_CXIndex_getGlobalOptions: [ uint32, [ CXIndex, ] ],
	clang_getFileName: [ CXString, [ CXFile, ] ],
	clang_getFileTime: [ time_t, [ CXFile, ] ],
	clang_getFileUniqueID: [ int32, [ CXFile, CXFileUniqueID_ptr, ] ],
	clang_isFileMultipleIncludeGuarded: [ uint32, [ CXTranslationUnit, CXFile, ] ],
	clang_getFile: [ CXFile, [ CXTranslationUnit, string, ] ],
	clang_File_isEqual: [ int32, [ CXFile, CXFile, ] ],
	clang_getNullLocation: [ CXSourceLocation, [ ] ],
	clang_equalLocations: [ uint32, [ CXSourceLocation, CXSourceLocation, ] ],
	clang_getLocation: [ CXSourceLocation, [ CXTranslationUnit, CXFile, uint32, uint32, ] ],
	clang_getLocationForOffset: [ CXSourceLocation, [ CXTranslationUnit, CXFile, uint32, ] ],
	clang_Location_isInSystemHeader: [ int32, [ CXSourceLocation, ] ],
	clang_Location_isFromMainFile: [ int32, [ CXSourceLocation, ] ],
	clang_getNullRange: [ CXSourceRange, [ ] ],
	clang_getRange: [ CXSourceRange, [ CXSourceLocation, CXSourceLocation, ] ],
	clang_equalRanges: [ uint32, [ CXSourceRange, CXSourceRange, ] ],
	clang_Range_isNull: [ int32, [ CXSourceRange, ] ],
	clang_getExpansionLocation: [ voit, [ CXSourceLocation, CXFile_ptr, uint32_ptr, uint32_ptr, uint32_ptr, ] ],
	clang_getPresumedLocation: [ voit, [ CXSourceLocation, CXString_ptr, uint32_ptr, uint32_ptr, ] ],
	clang_getInstantiationLocation: [ voit, [ CXSourceLocation, CXFile_ptr, uint32_ptr, uint32_ptr, uint32_ptr, ] ],
	clang_getSpellingLocation: [ voit, [ CXSourceLocation, CXFile_ptr, uint32_ptr, uint32_ptr, uint32_ptr, ] ],
	clang_getFileLocation: [ voit, [ CXSourceLocation, CXFile_ptr, uint32_ptr, uint32_ptr, uint32_ptr, ] ],
	clang_getRangeStart: [ CXSourceLocation, [ CXSourceRange, ] ],
	clang_getRangeEnd: [ CXSourceLocation, [ CXSourceRange, ] ],
	clang_getSkippedRanges: [ CXSourceRangeList_ptr, [ CXTranslationUnit, CXFile, ] ],
	clang_disposeSourceRangeList: [ voit, [ CXSourceRangeList_ptr, ] ],
	clang_getNumDiagnosticsInSet: [ uint32, [ CXDiagnosticSet, ] ],
	clang_getDiagnosticInSet: [ CXDiagnostic, [ CXDiagnosticSet, uint32, ] ],
	clang_loadDiagnostics: [ CXDiagnosticSet, [ string, uint32_ptr, CXString_ptr, ] ],
	clang_disposeDiagnosticSet: [ voit, [ CXDiagnosticSet, ] ],
	clang_getChildDiagnostics: [ CXDiagnosticSet, [ CXDiagnostic, ] ],
	clang_getNumDiagnostics: [ uint32, [ CXTranslationUnit, ] ],
	clang_getDiagnostic: [ CXDiagnostic, [ CXTranslationUnit, uint32, ] ],
	clang_getDiagnosticSetFromTU: [ CXDiagnosticSet, [ CXTranslationUnit, ] ],
	clang_disposeDiagnostic: [ voit, [ CXDiagnostic, ] ],
	clang_formatDiagnostic: [ CXString, [ CXDiagnostic, uint32, ] ],
	clang_defaultDiagnosticDisplayOptions: [ uint32, [ ] ],
	clang_getDiagnosticSeverity: [ uint32, [ CXDiagnostic, ] ],
	clang_getDiagnosticLocation: [ CXSourceLocation, [ CXDiagnostic, ] ],
	clang_getDiagnosticSpelling: [ CXString, [ CXDiagnostic, ] ],
	clang_getDiagnosticOption: [ CXString, [ CXDiagnostic, CXString_ptr, ] ],
	clang_getDiagnosticCategory: [ uint32, [ CXDiagnostic, ] ],
	clang_getDiagnosticCategoryName: [ CXString, [ uint32, ] ],
	clang_getDiagnosticCategoryText: [ CXString, [ CXDiagnostic, ] ],
	clang_getDiagnosticNumRanges: [ uint32, [ CXDiagnostic, ] ],
	clang_getDiagnosticRange: [ CXSourceRange, [ CXDiagnostic, uint32, ] ],
	clang_getDiagnosticNumFixIts: [ uint32, [ CXDiagnostic, ] ],
	clang_getDiagnosticFixIt: [ CXString, [ CXDiagnostic, uint32, CXSourceRange_ptr, ] ],
	clang_getTranslationUnitSpelling: [ CXString, [ CXTranslationUnit, ] ],
	clang_createTranslationUnitFromSourceFile: [ CXTranslationUnit, [ CXIndex, string, int32, string_ptr, uint32, CXUnsavedFile_ptr, ] ],
	clang_createTranslationUnit: [ CXTranslationUnit, [ CXIndex, string, ] ],
	clang_createTranslationUnit2: [ uint32, [ CXIndex, string, CXTranslationUnit_ptr, ] ],
	clang_defaultEditingTranslationUnitOptions: [ uint32, [ ] ],
	clang_parseTranslationUnit: [ CXTranslationUnit, [ CXIndex, string, string_ptr, int32, CXUnsavedFile_ptr, uint32, uint32, ] ],
	clang_parseTranslationUnit2: [ uint32, [ CXIndex, string, string_ptr, int32, CXUnsavedFile_ptr, uint32, uint32, CXTranslationUnit_ptr, ] ],
	clang_parseTranslationUnit2FullArgv: [ uint32, [ CXIndex, string, string_ptr, int32, CXUnsavedFile_ptr, uint32, uint32, CXTranslationUnit_ptr, ] ],
	clang_defaultSaveOptions: [ uint32, [ CXTranslationUnit, ] ],
	clang_saveTranslationUnit: [ int32, [ CXTranslationUnit, string, uint32, ] ],
	clang_disposeTranslationUnit: [ voit, [ CXTranslationUnit, ] ],
	clang_defaultReparseOptions: [ uint32, [ CXTranslationUnit, ] ],
	clang_reparseTranslationUnit: [ int32, [ CXTranslationUnit, uint32, CXUnsavedFile_ptr, uint32, ] ],
	clang_getTUResourceUsageName: [ string, [ uint32, ] ],
	clang_getCXTUResourceUsage: [ CXTUResourceUsage, [ CXTranslationUnit, ] ],
	clang_disposeCXTUResourceUsage: [ voit, [ CXTUResourceUsage, ] ],
	clang_getNullCursor: [ CXCursor, [ ] ],
	clang_getTranslationUnitCursor: [ CXCursor, [ CXTranslationUnit, ] ],
	clang_equalCursors: [ uint32, [ CXCursor, CXCursor, ] ],
	clang_Cursor_isNull: [ int32, [ CXCursor, ] ],
	clang_hashCursor: [ uint32, [ CXCursor, ] ],
	clang_getCursorKind: [ uint32, [ CXCursor, ] ],
	clang_isDeclaration: [ uint32, [ uint32, ] ],
	clang_isReference: [ uint32, [ uint32, ] ],
	clang_isExpression: [ uint32, [ uint32, ] ],
	clang_isStatement: [ uint32, [ uint32, ] ],
	clang_isAttribute: [ uint32, [ uint32, ] ],
	clang_isInvalid: [ uint32, [ uint32, ] ],
	clang_isTranslationUnit: [ uint32, [ uint32, ] ],
	clang_isPreprocessing: [ uint32, [ uint32, ] ],
	clang_isUnexposed: [ uint32, [ uint32, ] ],
	clang_getCursorLinkage: [ uint32, [ CXCursor, ] ],
	clang_getCursorVisibility: [ uint32, [ CXCursor, ] ],
	clang_getCursorAvailability: [ uint32, [ CXCursor, ] ],
	clang_getCursorPlatformAvailability: [ int32, [ CXCursor, int32_ptr, CXString_ptr, int32_ptr, CXString_ptr, CXPlatformAvailability_ptr, int32, ] ],
	clang_disposeCXPlatformAvailability: [ voit, [ CXPlatformAvailability_ptr, ] ],
	clang_getCursorLanguage: [ uint32, [ CXCursor, ] ],
	clang_Cursor_getTranslationUnit: [ CXTranslationUnit, [ CXCursor, ] ],
	clang_createCXCursorSet: [ CXCursorSet, [ ] ],
	clang_disposeCXCursorSet: [ voit, [ CXCursorSet, ] ],
	clang_CXCursorSet_contains: [ uint32, [ CXCursorSet, CXCursor, ] ],
	clang_CXCursorSet_insert: [ uint32, [ CXCursorSet, CXCursor, ] ],
	clang_getCursorSemanticParent: [ CXCursor, [ CXCursor, ] ],
	clang_getCursorLexicalParent: [ CXCursor, [ CXCursor, ] ],
	clang_getOverriddenCursors: [ voit, [ CXCursor, CXCursor_ptr_ptr, uint32_ptr, ] ],
	clang_disposeOverriddenCursors: [ voit, [ CXCursor_ptr, ] ],
	clang_getIncludedFile: [ CXFile, [ CXCursor, ] ],
	clang_getCursor: [ CXCursor, [ CXTranslationUnit, CXSourceLocation, ] ],
	clang_getCursorLocation: [ CXSourceLocation, [ CXCursor, ] ],
	clang_getCursorExtent: [ CXSourceRange, [ CXCursor, ] ],
	clang_getCursorType: [ CXType, [ CXCursor, ] ],
	clang_getTypeSpelling: [ CXString, [ CXType, ] ],
	clang_getTypedefDeclUnderlyingType: [ CXType, [ CXCursor, ] ],
	clang_getEnumDeclIntegerType: [ CXType, [ CXCursor, ] ],
	clang_getEnumConstantDeclValue: [ longlong, [ CXCursor, ] ],
	clang_getEnumConstantDeclUnsignedValue: [ ulonglong, [ CXCursor, ] ],
	clang_getFieldDeclBitWidth: [ int32, [ CXCursor, ] ],
	clang_Cursor_getNumArguments: [ int32, [ CXCursor, ] ],
	clang_Cursor_getArgument: [ CXCursor, [ CXCursor, uint32, ] ],
	clang_Cursor_getNumTemplateArguments: [ int32, [ CXCursor, ] ],
	clang_Cursor_getTemplateArgumentKind: [ uint32, [ CXCursor, uint32, ] ],
	clang_Cursor_getTemplateArgumentType: [ CXType, [ CXCursor, uint32, ] ],
	clang_Cursor_getTemplateArgumentValue: [ longlong, [ CXCursor, uint32, ] ],
	clang_Cursor_getTemplateArgumentUnsignedValue: [ ulonglong, [ CXCursor, uint32, ] ],
	clang_equalTypes: [ uint32, [ CXType, CXType, ] ],
	clang_getCanonicalType: [ CXType, [ CXType, ] ],
	clang_isConstQualifiedType: [ uint32, [ CXType, ] ],
	clang_isVolatileQualifiedType: [ uint32, [ CXType, ] ],
	clang_isRestrictQualifiedType: [ uint32, [ CXType, ] ],
	clang_getPointeeType: [ CXType, [ CXType, ] ],
	clang_getTypeDeclaration: [ CXCursor, [ CXType, ] ],
	clang_getDeclObjCTypeEncoding: [ CXString, [ CXCursor, ] ],
	clang_getTypeKindSpelling: [ CXString, [ uint32, ] ],
	clang_getFunctionTypeCallingConv: [ uint32, [ CXType, ] ],
	clang_getResultType: [ CXType, [ CXType, ] ],
	clang_getNumArgTypes: [ int32, [ CXType, ] ],
	clang_getArgType: [ CXType, [ CXType, uint32, ] ],
	clang_isFunctionTypeVariadic: [ uint32, [ CXType, ] ],
	clang_getCursorResultType: [ CXType, [ CXCursor, ] ],
	clang_isPODType: [ uint32, [ CXType, ] ],
	clang_getElementType: [ CXType, [ CXType, ] ],
	clang_getNumElements: [ longlong, [ CXType, ] ],
	clang_getArrayElementType: [ CXType, [ CXType, ] ],
	clang_getArraySize: [ longlong, [ CXType, ] ],
	clang_Type_getAlignOf: [ longlong, [ CXType, ] ],
	clang_Type_getClassType: [ CXType, [ CXType, ] ],
	clang_Type_getSizeOf: [ longlong, [ CXType, ] ],
	clang_Type_getOffsetOf: [ longlong, [ CXType, string, ] ],
	clang_Cursor_getOffsetOfField: [ longlong, [ CXCursor, ] ],
	clang_Cursor_isAnonymous: [ uint32, [ CXCursor, ] ],
	clang_Type_getNumTemplateArguments: [ int32, [ CXType, ] ],
	clang_Type_getTemplateArgumentAsType: [ CXType, [ CXType, uint32, ] ],
	clang_Type_getCXXRefQualifier: [ uint32, [ CXType, ] ],
	clang_Cursor_isBitField: [ uint32, [ CXCursor, ] ],
	clang_isVirtualBase: [ uint32, [ CXCursor, ] ],
	clang_getCXXAccessSpecifier: [ uint32, [ CXCursor, ] ],
	clang_Cursor_getStorageClass: [ uint32, [ CXCursor, ] ],
	clang_getNumOverloadedDecls: [ uint32, [ CXCursor, ] ],
	clang_getOverloadedDecl: [ CXCursor, [ CXCursor, uint32, ] ],
	clang_getIBOutletCollectionType: [ CXType, [ CXCursor, ] ],
	clang_visitChildren: [ uint32, [ CXCursor, CXCursorVisitor, CXClientData, ] ],
	clang_visitChildrenWithBlock: [ uint32, [ CXCursor, CXCursorVisitorBlock, ] ],
	clang_getCursorUSR: [ CXString, [ CXCursor, ] ],
	clang_constructUSR_ObjCClass: [ CXString, [ string, ] ],
	clang_constructUSR_ObjCCategory: [ CXString, [ string, string, ] ],
	clang_constructUSR_ObjCProtocol: [ CXString, [ string, ] ],
	clang_constructUSR_ObjCIvar: [ CXString, [ string, CXString, ] ],
	clang_constructUSR_ObjCMethod: [ CXString, [ string, uint32, CXString, ] ],
	clang_constructUSR_ObjCProperty: [ CXString, [ string, CXString, ] ],
	clang_getCursorSpelling: [ CXString, [ CXCursor, ] ],
	clang_Cursor_getSpellingNameRange: [ CXSourceRange, [ CXCursor, uint32, uint32, ] ],
	clang_getCursorDisplayName: [ CXString, [ CXCursor, ] ],
	clang_getCursorReferenced: [ CXCursor, [ CXCursor, ] ],
	clang_getCursorDefinition: [ CXCursor, [ CXCursor, ] ],
	clang_isCursorDefinition: [ uint32, [ CXCursor, ] ],
	clang_getCanonicalCursor: [ CXCursor, [ CXCursor, ] ],
	clang_Cursor_getObjCSelectorIndex: [ int32, [ CXCursor, ] ],
	clang_Cursor_isDynamicCall: [ int32, [ CXCursor, ] ],
	clang_Cursor_getReceiverType: [ CXType, [ CXCursor, ] ],
	clang_Cursor_getObjCPropertyAttributes: [ uint32, [ CXCursor, uint32, ] ],
	clang_Cursor_getObjCDeclQualifiers: [ uint32, [ CXCursor, ] ],
	clang_Cursor_isObjCOptional: [ uint32, [ CXCursor, ] ],
	clang_Cursor_isVariadic: [ uint32, [ CXCursor, ] ],
	clang_Cursor_getCommentRange: [ CXSourceRange, [ CXCursor, ] ],
	clang_Cursor_getRawCommentText: [ CXString, [ CXCursor, ] ],
	clang_Cursor_getBriefCommentText: [ CXString, [ CXCursor, ] ],
	clang_Cursor_getMangling: [ CXString, [ CXCursor, ] ],
	clang_Cursor_getCXXManglings: [ CXStringSet_ptr, [ CXCursor, ] ],
	clang_Cursor_getModule: [ CXModule, [ CXCursor, ] ],
	clang_getModuleForFile: [ CXModule, [ CXTranslationUnit, CXFile, ] ],
	clang_Module_getASTFile: [ CXFile, [ CXModule, ] ],
	clang_Module_getParent: [ CXModule, [ CXModule, ] ],
	clang_Module_getName: [ CXString, [ CXModule, ] ],
	clang_Module_getFullName: [ CXString, [ CXModule, ] ],
	clang_Module_isSystem: [ int32, [ CXModule, ] ],
	clang_Module_getNumTopLevelHeaders: [ uint32, [ CXTranslationUnit, CXModule, ] ],
	clang_Module_getTopLevelHeader: [ CXFile, [ CXTranslationUnit, CXModule, uint32, ] ],
	clang_CXXField_isMutable: [ uint32, [ CXCursor, ] ],
	clang_CXXMethod_isPureVirtual: [ uint32, [ CXCursor, ] ],
	clang_CXXMethod_isStatic: [ uint32, [ CXCursor, ] ],
	clang_CXXMethod_isVirtual: [ uint32, [ CXCursor, ] ],
	clang_CXXMethod_isConst: [ uint32, [ CXCursor, ] ],
	clang_getTemplateCursorKind: [ uint32, [ CXCursor, ] ],
	clang_getSpecializedCursorTemplate: [ CXCursor, [ CXCursor, ] ],
	clang_getCursorReferenceNameRange: [ CXSourceRange, [ CXCursor, uint32, uint32, ] ],
	clang_getTokenKind: [ uint32, [ CXToken, ] ],
	clang_getTokenSpelling: [ CXString, [ CXTranslationUnit, CXToken, ] ],
	clang_getTokenLocation: [ CXSourceLocation, [ CXTranslationUnit, CXToken, ] ],
	clang_getTokenExtent: [ CXSourceRange, [ CXTranslationUnit, CXToken, ] ],
	clang_tokenize: [ voit, [ CXTranslationUnit, CXSourceRange, CXToken_ptr_ptr, uint32_ptr, ] ],
	clang_annotateTokens: [ voit, [ CXTranslationUnit, CXToken_ptr, uint32, CXCursor_ptr, ] ],
	clang_disposeTokens: [ voit, [ CXTranslationUnit, CXToken_ptr, uint32, ] ],
	clang_getCursorKindSpelling: [ CXString, [ uint32, ] ],
	clang_getDefinitionSpellingAndExtent: [ voit, [ CXCursor, string_ptr, string_ptr, uint32_ptr, uint32_ptr, uint32_ptr, uint32_ptr, ] ],
	clang_enableStackTraces: [ voit, [ ] ],
	clang_executeOnThread: [ voit, [ voit_ptr, voit_ptr, uint32, ] ],
	clang_getCompletionChunkKind: [ uint32, [ CXCompletionString, uint32, ] ],
	clang_getCompletionChunkText: [ CXString, [ CXCompletionString, uint32, ] ],
	clang_getCompletionChunkCompletionString: [ CXCompletionString, [ CXCompletionString, uint32, ] ],
	clang_getNumCompletionChunks: [ uint32, [ CXCompletionString, ] ],
	clang_getCompletionPriority: [ uint32, [ CXCompletionString, ] ],
	clang_getCompletionAvailability: [ uint32, [ CXCompletionString, ] ],
	clang_getCompletionNumAnnotations: [ uint32, [ CXCompletionString, ] ],
	clang_getCompletionAnnotation: [ CXString, [ CXCompletionString, uint32, ] ],
	clang_getCompletionParent: [ CXString, [ CXCompletionString, uint32_ptr, ] ],
	clang_getCompletionBriefComment: [ CXString, [ CXCompletionString, ] ],
	clang_getCursorCompletionString: [ CXCompletionString, [ CXCursor, ] ],
	clang_defaultCodeCompleteOptions: [ uint32, [ ] ],
	clang_codeCompleteAt: [ CXCodeCompleteResults_ptr, [ CXTranslationUnit, string, uint32, uint32, CXUnsavedFile_ptr, uint32, uint32, ] ],
	clang_sortCodeCompletionResults: [ voit, [ CXCompletionResult_ptr, uint32, ] ],
	clang_disposeCodeCompleteResults: [ voit, [ CXCodeCompleteResults_ptr, ] ],
	clang_codeCompleteGetNumDiagnostics: [ uint32, [ CXCodeCompleteResults_ptr, ] ],
	clang_codeCompleteGetDiagnostic: [ CXDiagnostic, [ CXCodeCompleteResults_ptr, uint32, ] ],
	clang_codeCompleteGetContexts: [ ulonglong, [ CXCodeCompleteResults_ptr, ] ],
	clang_codeCompleteGetContainerKind: [ uint32, [ CXCodeCompleteResults_ptr, uint32_ptr, ] ],
	clang_codeCompleteGetContainerUSR: [ CXString, [ CXCodeCompleteResults_ptr, ] ],
	clang_codeCompleteGetObjCSelector: [ CXString, [ CXCodeCompleteResults_ptr, ] ],
	clang_getClangVersion: [ CXString, [ ] ],
	clang_toggleCrashRecovery: [ voit, [ uint32, ] ],
	clang_getInclusions: [ voit, [ CXTranslationUnit, CXInclusionVisitor, CXClientData, ] ],
	clang_getRemappings: [ CXRemapping, [ string, ] ],
	clang_getRemappingsFromFileList: [ CXRemapping, [ string_ptr, uint32, ] ],
	clang_remap_getNumFiles: [ uint32, [ CXRemapping, ] ],
	clang_remap_getFilenames: [ voit, [ CXRemapping, uint32, CXString_ptr, CXString_ptr, ] ],
	clang_remap_dispose: [ voit, [ CXRemapping, ] ],
	clang_findReferencesInFile: [ uint32, [ CXCursor, CXFile, CXCursorAndRangeVisitor, ] ],
	clang_findIncludesInFile: [ uint32, [ CXTranslationUnit, CXFile, CXCursorAndRangeVisitor, ] ],
	clang_findReferencesInFileWithBlock: [ uint32, [ CXCursor, CXFile, CXCursorAndRangeVisitorBlock, ] ],
	clang_findIncludesInFileWithBlock: [ uint32, [ CXTranslationUnit, CXFile, CXCursorAndRangeVisitorBlock, ] ],
	clang_index_isEntityObjCContainerKind: [ int32, [ uint32, ] ],
	clang_index_getObjCContainerDeclInfo: [ CXIdxObjCContainerDeclInfo_ptr, [ CXIdxDeclInfo_ptr, ] ],
	clang_index_getObjCInterfaceDeclInfo: [ CXIdxObjCInterfaceDeclInfo_ptr, [ CXIdxDeclInfo_ptr, ] ],
	clang_index_getObjCCategoryDeclInfo: [ CXIdxObjCCategoryDeclInfo_ptr, [ CXIdxDeclInfo_ptr, ] ],
	clang_index_getObjCProtocolRefListInfo: [ CXIdxObjCProtocolRefListInfo_ptr, [ CXIdxDeclInfo_ptr, ] ],
	clang_index_getObjCPropertyDeclInfo: [ CXIdxObjCPropertyDeclInfo_ptr, [ CXIdxDeclInfo_ptr, ] ],
	clang_index_getIBOutletCollectionAttrInfo: [ CXIdxIBOutletCollectionAttrInfo_ptr, [ CXIdxAttrInfo_ptr, ] ],
	clang_index_getCXXClassDeclInfo: [ CXIdxCXXClassDeclInfo_ptr, [ CXIdxDeclInfo_ptr, ] ],
	clang_index_getClientContainer: [ CXIdxClientContainer, [ CXIdxContainerInfo_ptr, ] ],
	clang_index_setClientContainer: [ voit, [ CXIdxContainerInfo_ptr, CXIdxClientContainer, ] ],
	clang_index_getClientEntity: [ CXIdxClientEntity, [ CXIdxEntityInfo_ptr, ] ],
	clang_index_setClientEntity: [ voit, [ CXIdxEntityInfo_ptr, CXIdxClientEntity, ] ],
	clang_IndexAction_create: [ CXIndexAction, [ CXIndex, ] ],
	clang_IndexAction_dispose: [ voit, [ CXIndexAction, ] ],
	clang_indexSourceFile: [ int32, [ CXIndexAction, CXClientData, IndexerCallbacks_ptr, uint32, uint32, string, string_ptr, int32, CXUnsavedFile_ptr, uint32, CXTranslationUnit_ptr, uint32, ] ],
	clang_indexSourceFileFullArgv: [ int32, [ CXIndexAction, CXClientData, IndexerCallbacks_ptr, uint32, uint32, string, string_ptr, int32, CXUnsavedFile_ptr, uint32, CXTranslationUnit_ptr, uint32, ] ],
	clang_indexTranslationUnit: [ int32, [ CXIndexAction, CXClientData, IndexerCallbacks_ptr, uint32, uint32, CXTranslationUnit, ] ],
	clang_indexLoc_getFileLocation: [ voit, [ CXIdxLoc, CXIdxClientFile_ptr, CXFile_ptr, uint32_ptr, uint32_ptr, uint32_ptr, ] ],
	clang_indexLoc_getCXSourceLocation: [ CXSourceLocation, [ CXIdxLoc, ] ],
	clang_Type_visitFields: [ uint32, [ CXType, CXFieldVisitor, CXClientData, ] ],
}, exports)