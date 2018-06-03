import React from 'react';

export const AudioContext = React.createContext({
  audio: {
    test: () => {console.log("testing")}
  }
})
