import React from "react";

const InfoBarContext = React.createContext({
  state: null,
  dispatch: ()=>{}
});

InfoBarContext.displayName = "InfoBarContext`"

export default InfoBarContext;