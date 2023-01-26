import React from "react";
import ErrorInReactUpsPage from "../Pages/Errors/ErrorInReactUpsPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {  
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service    
    //logErrorToMyService(error, errorInfo);  
  }
  render() {
    if (this.state.hasError) {  
      return <ErrorInReactUpsPage/>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;