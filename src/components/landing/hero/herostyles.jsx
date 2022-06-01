import styled from 'styled-components';
import { MdArrowForward, MdKeyboardArrowRight } from 'react-icons/md'

export const HeroContainer = styled.div`
  background: #151719;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 1100px;
  position: relative;
  font-family: 'Inter', sans-serif;
  z-index: 1;
  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.2)0%, rgba(0,0,0,0.6)100%),  
    linear-gradient(180deg, rgba(0,0,0,0.2)0%, transparent 100%)
    z-index: 2;
  }
  @media screen and (max-width: 768px) {
    height: 800px
  }
`
export const BannerImg = styled.img`
 display: block; 
 width: 80%;
 @media screen and (max-width: 768px) {
  display:none
}
`

export const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 150px;
  @media screen and (max-width: 768px) {
    top: 25vh
  }
`
export const HeroH1 = styled.h1`
  color: #fff;
  font-size: 48px;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px
  }
  @media screen and (max-width: 480px) {
    font-size: 32px
  }
`

export const HeroP = styled.p`
  margin-top: 0px;
  color: #9ca9b3;
  font-size: 24px;
  text-align: center;
  max-width: 600px;

  @media screen and (max-width: 768px) {
    font-size: 24px
  }
  @media screen and (max-width: 480px) {
    font-size: 18px
  }
`
export const HeroBtnWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    margin-bottom: 15px
  }
`

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 20px;
`
export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 20px;
`