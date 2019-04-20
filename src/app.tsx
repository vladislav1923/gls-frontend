import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faLink, faUserCircle, faPlus, faTimes, faSpinner} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import Shell from "./pages/shell/shell";
import NotesList from './pages/notes-list/notes-list';
import NoteCreator from './pages/note-creator/note-creator';

library.add(faLink, faUserCircle, faPlus, faTimes, faSpinner, faGithub);

class App extends Component {
    render() {
        return (
            <Router>
                <Shell>
                    <Route exact path="/" component={NotesList} />
                    <Route exact path="/new" component={NoteCreator} />
                </Shell>
            </Router>
        );
    }
}

export default App;
