import React from 'react'
import Icon1 from '../../../images/svg-1.svg'
import Icon2 from '../../../images/svg-2.svg'
import Icon3 from '../../../images/svg-3.svg'
import { FeaturesContainer, FeaturesH1, FeaturesWrapper, FeaturesCard, FeaturesIcon, FeaturesH2, FeaturesP } from './featurestyles'

const Features = () => {
  const featuresContents = [
    { icon: Icon1, featureH2: "Track", featureP: "Keep track of your expenses, systematically and categorically." },
    { icon: Icon2, featureH2: "Analyse", featureP: "We Analyse your expenses like never before. Visualise and reduce expenses." },
    { icon: Icon3, featureH2: "Split", featureP: "Split expenses among your friends. Keep track. Money matters." }
  ]

  return (
    <FeaturesContainer id='features'>
      <FeaturesH1>Our features</FeaturesH1>
      <FeaturesWrapper>
        {featuresContents.map((featuresContent, index) => (
          <FeaturesCard key={index}>
            <FeaturesIcon src={featuresContent.icon} />
            <FeaturesH2>{featuresContent.featureH2}</FeaturesH2>
            <FeaturesP>{featuresContent.featureP}</FeaturesP>
          </FeaturesCard>
        ))}
      </FeaturesWrapper>
    </FeaturesContainer>
  )
}

export default Features
