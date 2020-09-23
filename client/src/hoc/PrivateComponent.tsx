import React from 'react';

import router from 'next/router';

import firebase from '../fbConfig';

// eslint-disable-next-line import/prefer-default-export
export const withAuth = (Component) => {
  // eslint-disable-next-line react/display-name
  return class extends React.Component<null, { status: string }> {
    constructor(props: null) {
      super(props);
      this.state = {
        status: 'LOADING',
      };
    }
    componentDidMount() {
      firebase.auth().onAuthStateChanged((authUser) => {
        console.log('autthUser', authUser);
        if (authUser) {
          this.setState({
            status: 'SIGNED_IN',
          });
        } else {
          router.push('/');
        }
      });
    }

    renderContent() {
      const status = this.state.status;
      if (status === 'LOADING') {
        return <h1>Loading ......</h1>;
      } else if (status === 'SIGNED_IN') {
        return <Component {...this.props} />;
      }
    }

    render() {
      return <React.Fragment>{this.renderContent()}</React.Fragment>;
    }
  };
};
export default withAuth;
