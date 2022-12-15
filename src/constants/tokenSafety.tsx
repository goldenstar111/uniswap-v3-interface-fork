import { Trans } from 'components/Trans'

import { ZERO_ADDRESS } from './misc'
import { NATIVE_CHAIN_ID } from './tokens'
import WarningCache, { TOKEN_LIST_TYPES } from './TokenSafetyLookupTable'

export const TOKEN_SAFETY_ARTICLE = 'https://support.uniswap.org/hc/en-us/articles/8723118437133'

export enum WARNING_LEVEL {
  MEDIUM,
  UNKNOWN,
  BLOCKED,
}

export function getWarningCopy(warning: Warning | null, plural = false) {
  let heading = null,
    description = null
  if (warning) {
    switch (warning.level) {
      case WARNING_LEVEL.MEDIUM:
        heading = <p>This token isn't traded on leading U.S. centralized exchanges.</p>
        description = <Trans>Always conduct your own research before trading.</Trans>
        break
      case WARNING_LEVEL.UNKNOWN:
        heading = <p>This token isn't traded on leading U.S. centralized exchanges or frequently swapped on Uniswap.</p>
        description = <Trans>Always conduct your own research before trading.</Trans>
        break
      case WARNING_LEVEL.BLOCKED:
        description = <p>You can't trade this token using the Uniswap App.</p>
        break
    }
  }
  return { heading, description }
}

export type Warning = {
  level: WARNING_LEVEL
  message: JSX.Element
  /* canProceed determines whether triangle/slash alert icon is used, and
    whether this token is supported/able to be traded */
  canProceed: boolean
}

const MediumWarning: Warning = {
  level: WARNING_LEVEL.MEDIUM,
  message: <Trans>Caution</Trans>,
  canProceed: true,
}

const StrongWarning: Warning = {
  level: WARNING_LEVEL.UNKNOWN,
  message: <Trans>Warning</Trans>,
  canProceed: true,
}

const BlockedWarning: Warning = {
  level: WARNING_LEVEL.BLOCKED,
  message: <Trans>Not Available</Trans>,
  canProceed: false,
}

export function checkWarning(tokenAddress: string) {
  if (tokenAddress === NATIVE_CHAIN_ID || tokenAddress === ZERO_ADDRESS) {
    return null
  }
  switch (WarningCache.checkToken(tokenAddress.toLowerCase())) {
    case TOKEN_LIST_TYPES.UNI_DEFAULT:
      return null
    case TOKEN_LIST_TYPES.UNI_EXTENDED:
      return MediumWarning
    case TOKEN_LIST_TYPES.UNKNOWN:
      return StrongWarning
    case TOKEN_LIST_TYPES.BLOCKED:
      return BlockedWarning
    case TOKEN_LIST_TYPES.BROKEN:
      return BlockedWarning
  }
}
