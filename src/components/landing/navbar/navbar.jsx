import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavLinks, NavItem, NavBtn, NavBtnLink } from './navbarstyles'
import { animateScroll as scroll } from 'react-scroll';
import { useAuth } from '../../../context/AuthContext'

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false)
  const { currentUser } = useAuth()

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])

  const toggleHome = () => {
    scroll.scrollToTop();
  }

  const pageData = [
    { to: 'about', title: "About" },
    { to: 'features', title: "Features" },
    { to: 'discover', title: "Discover" },
    { to: 'SignUp', title: "Ease" }
  ]

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to='/' onClick={toggleHome}>Walletnode</NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              {pageData.map((pageInfo, index) => (
                <NavItem key={index}>
                  <NavLinks to={pageInfo.to} smooth={true} duration={500} spy={true} exact='true' offset={-80}>
                    {pageInfo.title}
                  </NavLinks>
                </NavItem>
              ))
              }
            </NavMenu>
            <NavMenu>
              <NavBtn>
                {currentUser == null ? (
                  <>
                    <NavBtnLink to='/SignUp'>Sign Up</NavBtnLink>
                    <NavBtnLink to='/Login'>Log In</NavBtnLink>
                  </>
                ) :
                  <>
                    <NavBtnLink to='/app/dashboard'>Login as {currentUser.displayName}</NavBtnLink>
                    <NavBtnLink to='/SignUp'>Sign Up</NavBtnLink>
                    <NavBtnLink to='/Login'>Log In</NavBtnLink>
                  </>
                }
              </NavBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar