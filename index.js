var ref = require('ref')
var index_lib = require('./lib/index')
var CXString_lib = require('./lib/CXString')

var Index = exports.Index = function (pch, diags) {
	if (!(this instanceof Index)) return new Index(pch, diags)

	if (pch instanceof Buffer) {
		this.instance = pch
	} else {
		this.instance = index_lib.clang_createIndex(pch ? 1 : 0, diags ? 1 : 0)
	}

	this.dispose = function() {
		index_lib.clang_disposeIndex(this.instance)
	}
}

var Cursor = exports.Cursor = function (instance) {
	if (!(this instanceof Cursor)) return new Cursor(instance)


	this.kind = instance.kind
	this.kindName = Cursor[this.kind]
	Object.defineProperties(this, {
		usr: {
			get: function () {
				return toString(index_lib.clang_getCursorUSR(instance))
			},
			enumerable: true
		},
		spelling: {
			get: function () {
				return toString(index_lib.clang_getCursorSpelling(instance))
			},
			enumerable: true
		},
		displayName: {
			get: function () {
				return toString(index_lib.clang_getCursorDisplayName(instance))
			},
			enumerable: true
		},
		location: {
			get: function () {
				return Location(index_lib.clang_getCursorLocation(instance))
			},
			enumerable: true
		},
		enumValue: {
			get: function () {
				return index_lib.clang_getEnumConstantDeclValue(instance)
			},
			enumerable: true
		},
		enumUValue: {
			get: function () {
				return index_lib.clang_getEnumConstantDeclUnsignedValue(instance)
			},
			enumerable: true
		},
		numberArguments: {
			get: function () {
				return index_lib.clang_Cursor_getNumArguments(instance)
			},
			enumerable: true
		},
		type: {
			get: function () {
				return new Type(index_lib.clang_getCursorType(instance))
			},
			enumerable: true
		},
		enumType: {
			get: function () {
				return new Type(index_lib.clang_getEnumDeclIntegerType(instance))
			},
			enumerable: true
		},
		typedefType: {
			get: function () {
				return new Type(index_lib.clang_getTypedefDeclUnderlyingType(instance))
			},
			enumerable: true
		},
		resultType: {
			get: function () {
				return new Type(index_lib.clang_getCursorResultType(instance))
			},
			enumerable: true
		},
		canonicalCursor: {
			get: function () {
				return new Cursor(index_lib.clang_getCanonicalCursor(instance))
			},
			enumerable: true
		},
		definition: {
			get: function () {
				return new Cursor(index_lib.clang_getCursorDefinition(instance))
			},
			enumerable: true
		},
		referenced: {
			get: function () {
				return new Cursor(index_lib.clang_getCursorReferenced(instance))
			},
			enumerable: true
		},
	})

	this.getArgument = function (index) {
		return new Cursor(index_lib.clang_Cursor_getArgument(instance, index))
	}

	// var tu = index_lib.clang_Cursor_getTranslationUnit(instance)
	// var range = index_lib.clang_getCursorExtent(instance)
	// var tokens = ref.alloc(lib.CXTokenPtr)
	// var numTokens = ref.alloc('int')
	// index_lib.clang_tokenize(tu, range, tokens, numTokens)

	// this.numTokens = numTokens.deref() - 1
	// this.tokens = []

	// var tokensArray = new Buffer(this.numTokens * lib.CXToken.size)
	// var _tokensArray = tokensArray.ref()
	// _tokensArray.writePointer(tokens.deref())
	// tokensArray = _tokensArray.deref()

	// for(var i = 0; i < this.numTokens; i++) {
	// 	var token = tokensArray.slice(i * lib.CXToken.size, (i + 1) * lib.CXToken.size)
	// 	token.type = lib.CXToken
	// 	token = token.deref()
	// 	token = index_lib.clang_getTokenSpelling(tu, token)
	// 	token = toString(token)
	// 	this.tokens.push(token)
	// }


	this.visitChildren = function (cb) {
		cb = cb || function() {}
		var data = {
			cb: cb
		}
		index_lib.clang_visitChildren(instance, function (current, parent, data) {
			current = new Cursor(current)
			parent = new Cursor(parent)

			data = data.readObject()
			var ret = data.cb.call(current, parent)
			if(
				ret != index_lib.CXChildVisitResult.CXChildVisit_Break || 
				ret != index_lib.CXChildVisitResult.CXChildVisit_Continue || 
				ret != index_lib.CXChildVisitResult.CXChildVisit_Recurse
			) {
				ret = +!ret
			}
			return ret
		}, ref.alloc(ref.types.Object, data))
	}

	function Location (instance) {
		var file = ref.alloc(CXString_lib.CXString)
		var line = ref.alloc(ref.types.uint32)
		var column = ref.alloc(ref.types.uint32)
		index_lib.clang_getPresumedLocation(instance, file, line, column)

		return {
			filename: toString(file.deref()),
			line: line.deref(),
			column: column.deref(),
		}
	}
}
Object.keys(index_lib.CXCursorKind).forEach(function (key) {
	var arr = key.split('_')
	if (arr.length > 1) {
		Cursor[index_lib.CXCursorKind[key]] = arr.slice(1).join('_')
		Cursor[arr.slice(1).join('_')] = index_lib.CXCursorKind[key]
	}
})

var Type = exports.Type = function (instance) {
	if (!(this instanceof Type)) return new Type(instance)


	this.kind = instance.kind
	this.kindName = Type[this.kind]
	Object.defineProperties(this, {
		spelling: {
			get: function () {
				return toString(index_lib.clang_getTypeKindSpelling(instance.kind))
			},
			enumerable: true
		},
		resultType: {
			get: function () {
				return new Type(index_lib.clang_getResultType(instance))
			},
			enumerable: true
		},
		canonicalType: {
			get: function () {
				return new Type(index_lib.clang_getCanonicalType(instance))
			},
			enumerable: true
		},
		typeDeclaration: {
			get: function () {
				return new Cursor(index_lib.clang_getTypeDeclaration(instance))
			},
			enumerable: true
		},
		pointeeType: {
			get: function () {
				return new Type(index_lib.clang_getPointeeType(instance))
			},
			enumerable: true
		},
		elementType: {
			get: function () {
				return new Type(index_lib.clang_getElementType(instance))
			},
			enumerable: true
		},
		arrayElementType: {
			get: function () {
				return new Type(index_lib.clang_getArrayElementType(instance))
			},
			enumerable: true
		}
	})
	this.numElements = index_lib.clang_getNumElements(instance)
	this.arraySize = index_lib.clang_getArraySize(instance)
	this.isPODType = !!index_lib.clang_isPODType(instance)
	this.numArgTypes = index_lib.clang_getNumArgTypes(instance)
	this.getArgType = function (arg) {
		return new Type(index_lib.clang_getArgType(instance, arg))
	}
}
Object.keys(index_lib.CXTypeKind).forEach(function (key) {
	var arr = key.split('_')

	if (arr.length > 1) {
		Type[index_lib.CXTypeKind[key]] = arr.slice(1).join('_')
		Type[arr.slice(1).join('_')] = index_lib.CXTypeKind[key]
	}
})

var TranslationUnit = exports.TranslationUnit = function (index, file, args) {
	if (!(this instanceof TranslationUnit)) return new TranslationUnit(index, file, args)

	var cargs = new Buffer(ref.sizeof.pointer * args.length)
	args.forEach(function (value, index) {
		cargs.writePointer(ref.allocCString(value), index * ref.sizeof.pointer)
	})
	// var instance = index_lib.clang_parseTranslationUnit(index.instance, file, cargs, args.length, null, 0, 0)
	var instance = index_lib.clang_createTranslationUnitFromSourceFile(index.instance, file, args.length, cargs, 0, null)
	var cursor = index_lib.clang_getTranslationUnitCursor(instance)

	this.cursor = new Cursor(cursor)
}

function toString(cxstring) {
	return CXString_lib.clang_getCString(cxstring)
}