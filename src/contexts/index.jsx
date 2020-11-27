import React, {createContext, useContext} from 'react';

const Context = createContext({});

class ContextProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    const value = {
      'state': this.state
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

}

export {Context, ContextProvider};
export const useStateValue = () => useContext(Context);