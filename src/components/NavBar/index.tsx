import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { chainIdToBackendName } from 'graphql/data/util'
import { Box } from '../Box'
import { Row } from '../Flex'
import { UniIcon } from '../icons'
import { ReactNode } from 'react'
import { NavLink, NavLinkProps, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'

import * as styles from './style.css'

const MobileBottomBar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: space-between;
  padding: 4px 8px;
  height: 56px;
  background: ${({ theme }) => theme.backgroundSurface};
  border-top: 1px solid ${({ theme }) => theme.backgroundOutline};

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    display: none;
  }
`

interface MenuItemProps {
  href: string
  id?: NavLinkProps['id']
  isActive?: boolean
  children: ReactNode
}

const MenuItem = ({ href, id, isActive, children }: MenuItemProps) => {
  return (
    <NavLink
      to={href}
      className={isActive ? styles.activeMenuItem : styles.menuItem}
      id={id}
      style={{ textDecoration: 'none' }}
    >
      {children}
    </NavLink>
  )
}

const PageTabs = () => {
  const { pathname } = useLocation()
  const { chainId: connectedChainId } = useWeb3React()
  const chainName = chainIdToBackendName(connectedChainId)

  const isPoolActive =
    pathname.startsWith('/pool') ||
    pathname.startsWith('/add') ||
    pathname.startsWith('/remove') ||
    pathname.startsWith('/increase') ||
    pathname.startsWith('/find')

  return (
    <>
      <MenuItem href="/pool" id="pool-nav-link" isActive={isPoolActive}>
        <Trans>Pool</Trans>
      </MenuItem>
    </>
  )
}

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <>
      <nav className={styles.nav}>
        <Box display="flex" height="full" flexWrap="nowrap" alignItems="stretch">
          <Box className={styles.leftSideContainer}>
            <Box className={styles.logoContainer}>
              <UniIcon
                width="48"
                height="48"
                className={styles.logo}
                onClick={() => {
                  navigate('/')
                }}
              />
            </Box>
            <Row gap={{ xl: '0', xxl: '8' }} display={{ sm: 'none', lg: 'flex' }}>
              <PageTabs />
            </Row>
          </Box>
          <Box className={styles.middleContainer} alignItems="flex-start" />
          <Box className={styles.rightSideContainer}>
            <Row gap="12">
            </Row>
          </Box>
        </Box>
      </nav>
      <MobileBottomBar>
        <PageTabs />
        <Box marginY="4" />
      </MobileBottomBar>
    </>
  )
}

export default Navbar
