import { PermitSingle } from '@uniswap/permit2-sdk'

interface Permit extends PermitSingle {
  sigDeadline: number
}

export interface PermitSignature extends Permit {
  signature: string
}
