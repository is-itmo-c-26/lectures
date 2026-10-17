	.intel_syntax noprefix
	.file	"function-call.cpp"
	.text
	.globl	_Z3addii                        # -- Begin function _Z3addii
	.p2align	4
	.type	_Z3addii,@function
_Z3addii:                               # @_Z3addii
# %bb.0:
	push	rbp
	mov	rbp, rsp
	sub	rsp, 12
	mov	dword ptr [rbp - 4], edi
	mov	dword ptr [rbp - 8], esi
	mov	eax, dword ptr [rbp - 4]
	add	eax, dword ptr [rbp - 8]
	mov	dword ptr [rbp - 12], eax
	mov	eax, dword ptr [rbp - 12]
	add	rsp, 12
	pop	rbp
	ret
.Lfunc_end0:
	.size	_Z3addii, .Lfunc_end0-_Z3addii
                                        # -- End function
	.globl	main                            # -- Begin function main
	.p2align	4
	.type	main,@function
main:                                   # @main
# %bb.0:
	push	rbp
	mov	rbp, rsp
	sub	rsp, 16
	mov	dword ptr [rbp - 4], 0
	mov	dword ptr [rbp - 8], 40
	mov	dword ptr [rbp - 12], 2
	mov	edi, dword ptr [rbp - 8]
	mov	esi, dword ptr [rbp - 12]
	call	_Z3addii
	mov	dword ptr [rbp - 16], eax
	mov	eax, dword ptr [rbp - 16]
	add	rsp, 16
	pop	rbp
	ret
.Lfunc_end1:
	.size	main, .Lfunc_end1-main
                                        # -- End function
	.ident	"Homebrew clang version 21.1.1"
	.section	".note.GNU-stack","",@progbits
	.addrsig
	.addrsig_sym _Z3addii
