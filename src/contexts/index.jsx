import React, {createContext, useContext} from 'react';

const Context = createContext({});

class ContextProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      account: null,
      accountValidated: null,
      modals: {
        data: {
          noWeb3BrowserModalIsOpen: this.noWeb3BrowserModalIsOpen,
          noWalletModalIsOpen: this.noWalletModalIsOpen,
          connectionModalIsOpen: null,
          accountConnectionPending: null,
          userRejectedConnect: null,
          accountValidationPending: null,
          userRejectedValidation: null,
          wrongNetworkModalIsOpen: null,
          transactionConnectionModalIsOpen: null,
          lowFundsModalIsOpen: null
        },
        methods: {
          openNoWeb3BrowserModal: this.openNoWeb3BrowserModal,
          closeNoWeb3BrowserModal: this.closeNoWeb3BrowserModal,
          openNoWalletModal: this.openNoWalletModal,
          closeNoWalletModal: this.closeNoWalletModal,
          closeConnectionModal: this.closeConnectionModal,
          openConnectionModal: this.openConnectionModal,
          closeConnectionPendingModal: this.closeConnectionPendingModal,
          openConnectionPendingModal: this.openConnectionPendingModal,
          closeUserRejectedConnectionModal: this.closeUserRejectedConnectionModal,
          openUserRejectedConnectionModal: this.openUserRejectedConnectionModal,
          closeValidationPendingModal: this.closeValidationPendingModal,
          openValidationPendingModal: this.openValidationPendingModal,
          closeUserRejectedValidationModal: this.closeUserRejectedValidationModal,
          openUserRejectedValidationModal: this.openUserRejectedValidationModal,
          closeWrongNetworkModal: this.closeWrongNetworkModal,
          openWrongNetworkModal: this.openWrongNetworkModal,
          closeTransactionConnectionModal: this.closeTransactionConnectionModal,
          openTransactionConnectionModal: this.openTransactionConnectionModal,
          closeLowFundsModal: this.closeLowFundsModal,
          openLowFundsModal: this.openLowFundsModal
        }
      },
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  connectAndValidateAccount = async callback => {
    // Check for account
    if (!this.state.account || !this.state.accountValidated) {
      // Show modal to connect account
      this.openConnectionModal(null, callback);
    }

    // await this.initAccount();
    // await this.validateAccount();
  };

  openConnectionModal = (e, callback) => {
    if (typeof e !== "undefined" && e !== null) {
      console.log(e);
      e.preventDefault();
    }

    let modals = { ...this.state.modals };
    modals.data.connectionModalIsOpen = true;
    this.setState({ modals: modals, callback: callback });
  };

  render() {
    const value = {
      'state': this.state,
      'connectAndValidateAccount': this.connectAndValidateAccount
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