import { ContractTransaction } from '@ethersproject/contracts'
import { ApproveTransactionInfo } from 'state/transactions/types'

import { PermitSignature } from './usePermitAllowance'

enum PermitState {
  INVALID,
  LOADING,
  PERMIT_NEEDED,
  PERMITTED,
}

export interface Permit {
  state: PermitState
  signature?: PermitSignature
  callback?: (sPendingApproval: boolean) => Promise<{
    response: ContractTransaction
    info: ApproveTransactionInfo
  } | void>
}
