import React, {Component} from 'react';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faLink, faUserCircle, faPlus, faTimes} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import Shell from "./pages/shell/shell";

library.add(faLink, faUserCircle, faPlus, faTimes, faGithub);

class App extends Component {
    render() {
        return (
            <Shell/>
        );
    }
}

export default App;
