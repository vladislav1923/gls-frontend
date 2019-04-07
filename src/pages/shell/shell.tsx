import React, {Component} from 'react';
import './shell.less';
import Header from "../../components/header/header";

class Shell extends Component {
    render() {
        return (
            <main className="shell">
                <Header />
            </main>
        );
    }
}

export default Shell;
