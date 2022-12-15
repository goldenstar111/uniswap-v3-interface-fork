import { Currency, CurrencyAmount, Percent, Token } from '@uniswap/sdk-core'
import { NATIVE_CHAIN_ID } from 'constants/tokens'

export const formatToDecimal = (
  intialNumberObject: Percent | CurrencyAmount<Token | Currency>,
  decimalPlace: number
): number => parseFloat(intialNumberObject.toFixed(decimalPlace))

export const getTokenAddress = (currency: Currency) => (currency.isNative ? NATIVE_CHAIN_ID : currency.address)

export const formatPercentInBasisPointsNumber = (percent: Percent): number => parseFloat(percent.toFixed(2)) * 100
