import React from 'react'
import { SidebarContainer, Icon, CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink, SidebarRoute, SideBtnWrap } from './sidebarelements'

const Sidebar = ({ isOpen, toggle }) => {

  const pageData = [
    { to: 'about', title: "About" },
    { to: 'features', title: "Features" },
    { to: 'discover', title: "Discover" },
    { to: 'SignUp', title: "SignUp" },
  ]

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu >
          {pageData.map((pageInfo, index) => (
            <SidebarLink to={pageInfo.to} onClick={toggle} key={index}>
              {pageInfo.title}
            </SidebarLink>
          ))}
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/signin'>Sign in</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar
