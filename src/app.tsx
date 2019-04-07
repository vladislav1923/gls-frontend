import React, {Component} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faLink, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import Shell from "./pages/shell/shell";

library.add(faLink, faUserCircle);

class App extends Component {
    render() {
        return (
            <Shell/>
        );
    }
}

export default App;
