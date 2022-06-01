import SyncImg from '../../../images/svg-4.svg'
import LoginAnytime from '../../../images/svg-5.svg'
import InvestSuggestIcon from '../../../images/svg-6.svg'

export const homeObjOne = {
  id: 'about',
  lightBg: true,
  lightText: false,
  lighttextDesc: false,
  topLine: 'We noded our accessiblity',
  headline: 'Stay in sync, realtime, all time',
  description: 'Get access to our exclusive apps from Android, iOS that allows you to track unlimited transactions at the tip of your fingers.',
  buttonLabel: 'Get started',
  imgStart: false,
  img: SyncImg,
  alt: 'car',
  dark: false,
  primary: false,
  darkText: true
};

export const homeObjTwo = {
  id: 'discover',
  lightBg: false,
  lightText: true,
  lighttextDesc: false,
  topLine: 'Unlimited Access',
  headline: 'Login to your account at any time',
  description: "No, we aren't like others. No charges, ever. Pinkly Promise.",
  buttonLabel: 'Learn More',
  imgStart: true,
  img: LoginAnytime,
  alt: 'Piggybanck',
  dark: true,
  primary: true,
  darkText: false
};

export const homeObjThree = {
  id: 'SignUp',
  lightBg: true,
  lightText: false,
  lighttextDesc: false,
  topLine: 'Data-Driven Insights',
  headline: 'We make you feel investing is easy.',
  description: 'Our top analysts pitch investment ideas adjusted to your risk appetite.',
  buttonLabel: 'Start Now',
  imgStart: false,
  img: InvestSuggestIcon,
  alt: 'car',
  primary: false,
  darkText: true
};
