import React, {Component} from 'react';
import './shell.less';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

class Shell extends Component {
    render() {
        return (
            <main className="shell">
                <header>
                    <Header/>
                </header>
                <section className="container">
                    {this.props.children}
                </section>
                <footer>
                    <Footer/>
                </footer>
            </main>
        );
    }
}

export default Shell;
