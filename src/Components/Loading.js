import React from 'react';
import Loader from "react-loader-spinner";

export default class Loading extends React.PureComponent {
    render() {
        return (<Loader type="Puff" color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
            //3 secs
        />);
    }
}