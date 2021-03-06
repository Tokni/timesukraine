import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Link } from 'react-router-dom'
import ScenarioSelectionList from '../scenarioSelection/ScenarioSelectionList'
import ToggleSwitch from './ToggleSwitch'
import { Trans, withNamespaces } from 'react-i18next';

const MenuLayout = styled.div`
  display: none;
  ${breakpoint('mobile','desktop')`
    display: flex;  
    min-height: 100vh;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    width: 80px;
    color: white;
    background: rgb(50, 50, 50);
    visibility: visible;
  `}
  `;

const AppLogo  = styled.img`
  width: 45px;
  height: 67px;
  margin: 5px;
  border: 0;
  `;

const ModelersLogo  = styled.img`
  width: 65px;
  border-style: solid;
  border-width: 2px;
  border-color: white;
  margin-bottom: 10px;
  `;

const MenuHeader =  styled(Link)`
  padding: 5px;
  margin: 0;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color:white;
  `;

const LanguageGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px 0px 0px;
  `;

const LanguageButton = styled.button`
  padding: 0px;
  margin-right: 2px;
  color: black;
  `; 

const MenuSeparatorLine  = styled.hr`
  margin: 0.25em 12px 0.25em 5px;
  border-color: #555;
  border-width: 1px;
  width: 100hh;
  `;

const MenuRoutes  = styled.div`
  padding: 5px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const MenuItem  = styled(Link)`
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  font-size: 0.7em;
  margin: 5px;
  width: 100%;
  color: ${props => (props.selected ? 'yellow' : 'inherit')};
  text-align: center;
  text-decoration: none;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  `;

const ScenarioSelection  = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  `;

const ToggleDifference = styled.div`
  padding: 5px;
  display: flex;
  justify-content:start;
  align-content:center;
  flex-direction: column;
  `;

const ToggleSwitchText = styled.div`
  font-size: 0.7em;
  color: ${props => (props.singleMode ? 'gray' : props.selected ? '#2196F3' : 'white')};
  margin-top: 5px;
  `;

const MenuFooter  = styled.div`
  padding: 5px;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const CopyrightNotice = styled.div`
  font-size: 0.7em;
  padding: 5px;
  margin: 0;
  width: 100%;
  text-align: center;
  `;

const ExternalLink = styled.a`
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  `;

export class ScenarioSelectionMenu extends React.Component {

  render() {
    const { i18n } = this.props;
    return (
      <MenuLayout>
        <AppLogo src='./images/dtulogo_white.png' alt='logo'/>
        <ModelersLogo src='images/times-ukraine-modellers.gif' />
        <MenuHeader to='/'>
          <Trans i18nKey='main-menu.times-ukraine' />
        </MenuHeader>
        <LanguageGroup>
          <LanguageButton onClick={() => i18n.changeLanguage('uk')}>UK</LanguageButton>
          <LanguageButton onClick={() => i18n.changeLanguage('en')}>EN</LanguageButton>
        </LanguageGroup>
        <MenuRoutes>
          <MenuItem to='/about'><Trans i18nKey='mobile-menu.about' /></MenuItem>
          <MenuItem to='/descriptions'><Trans i18nKey='mobile-menu.descriptions' /></MenuItem>
          <MenuItem to='/recommendations'><Trans i18nKey='mobile-menu.recommend' /></MenuItem>
          <MenuItem to='/assumptions'><Trans i18nKey='mobile-menu.assumptions' /></MenuItem>
          <MenuItem to='/subscribe'><Trans i18nKey='mobile-menu.subscribe' /></MenuItem>
        </MenuRoutes>
        <MenuSeparatorLine />        
        <ScenarioSelection>
          <ScenarioSelectionList
            updateScenarioSelection={this.props.updateScenarioSelection}
            name='scenarioSelection'
            selectedValue={this.props.scenarioSelection.scenarioSelection}
            selectedValue2={this.props.scenarioSelection.scenarioSelection2}
            dimensionOptions={this.props.scenarioCombinations.scenarioOptions}
            dimensionTitle={this.props.t('main-menu.scenarios', { framework: "react-i18next" })}
            narrowVersion={true}
          />
        </ScenarioSelection>
        <MenuSeparatorLine />        
        <ToggleDifference onClick={(e) => this.props.toggleDifference(e)}>
          <ToggleSwitch
            dimmed={this.props.scenarioSelection.scenarioSelection2===""}
            checked={this.props.scenarioSelection.showDifference}
          />
          <ToggleSwitchText
            singleMode={this.props.scenarioSelection.scenarioSelection2===""}
            selected={this.props.scenarioSelection.showDifference}
          ><Trans i18nKey='main-menu.scenario-difference' /></ToggleSwitchText>
        </ToggleDifference>
        <MenuSeparatorLine />        
        <MenuFooter>
          <CopyrightNotice>
            <ExternalLink href='http://www.tokni.com'><Trans i18nKey='main-menu.online-version-from-tokni' /></ExternalLink>
          </CopyrightNotice>
        </MenuFooter>
      </MenuLayout>
    );
  }
}

ScenarioSelectionMenu.propTypes = {
  updateScenarioSelection: PropTypes.func.isRequired,
  scenarioSelection: PropTypes.object.isRequired,
  scenarioCombinations: PropTypes.object.isRequired,
  toggleDifference: PropTypes.func.isRequired,
  i18n: PropTypes.any,
  t: PropTypes.any
}

export default withNamespaces('common')(ScenarioSelectionMenu);