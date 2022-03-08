// React
import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Context from '../../../Context'
import { updateFBNewAlterIntro } from '../../../Firebase'

// Components
import IntroNavBar from './intro/IntroNavBar'
import ExplainMarkdown from './intro/ExplainMarkdown'
import IntroView from './intro/IntroView'
import IntroEdit from './intro/IntroEdit'

// This component is used in components/main/System.js
const Intro = (props) => {

  const context = useContext(Context)

  const { newAlterIntro, updateNewAlterIntro, toggleSystemView } = props

  const [introNav, setIntroNav] = useState('edit')
  const [introContents, setIntroContents] = useState(newAlterIntro)
  const [introStatus, setIntroStatus] = useState('Saved!')

  const handleIntroNav = (page) => {
    setIntroNav(page)
  }

  const updateContents = (text) => {
    setIntroStatus('Not Saved!')
    setIntroContents(text)
  }

  const saveContents = async () => {
    await updateFBNewAlterIntro(introContents)
    setIntroStatus('Saved!')
    updateNewAlterIntro(introContents)
    return
  }

  return (
    <View>
      <IntroNavBar 
        introNav={introNav} 
        saveContents={saveContents} 
        introStatus={introStatus}
        handleIntroNav={handleIntroNav} 
        toggleSystemView={toggleSystemView} />
      { introNav == 'edit' && <IntroEdit 
                                updateContents={updateContents} 
                                introContents={introContents} />}
      { introNav == 'view' && <IntroView  
                                introContents={introContents} />}
      {/* { introNav == 'explain' && <ExplainMarkdown />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  ViewContainer: {
    maxHeight: '100%',
    flex: 1,
  }
})

export default Intro;