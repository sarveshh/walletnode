import React, { useState } from 'react'
import { HeroContainer, HeroContent, HeroH1, HeroP, HeroBtnWrapper, ArrowForward, ArrowRight, BannerImg } from './herostyles'
import { SquaredButtonWithLink, SquaredButton } from '../buttonelements'
import banner from '../../../images/banner.png'
import { Box } from '@material-ui/core'
const Hero = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover)
  }

  return (
    <HeroContainer id='home'>
      <HeroContent>
        <HeroH1>No.1 Expense Manager & Budget Planner</HeroH1>
        <HeroP>Simplest way to manage personal finances.<br />Because money matters.</HeroP>
        <HeroBtnWrapper>
          <SquaredButton to="https://github.com/sarveshh/WalletNode" primary={true} dark='true'>
            <a href="https://github.com/sarveshh/WalletNode" target="_blank" rel="noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
              View on Github
            </a>
          </SquaredButton>
          <SquaredButtonWithLink to='SignUp' onMouseEnter={onHover} background="#25282c" onMouseLeave={onHover} dark='true' smooth={true} duration={500} spy={true} exact='true' offset={-80}>
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </SquaredButtonWithLink>
        </HeroBtnWrapper>
        <Box display="flex" justifyContent="center" alignItems="center" m={4}>
          <BannerImg src={banner} alt="" width="80%" />
        </Box>
      </HeroContent>
    </HeroContainer>
  )
}

export default Hero
