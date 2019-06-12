import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createNoteStore} from './store/create-note.store'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faLink, faUserCircle, faPlus, faTimes, faChevronDown, faFrown, faMeh, faSmile} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import Shell from './pages/shell/shell';
import NotesList from './pages/notes-list/notes-list';
import NoteParser from './pages/note-parser/note-parser';
import NoteCreator from './pages/note-creator/note-creator';

library.add(faLink, faUserCircle, faPlus, faTimes, faChevronDown, faFrown, faMeh, faSmile, faGithub);

class App extends Component {
    render() {
        return (
            <Provider store={createNoteStore}>
                <Router>
                    <Shell>
                        <Switch>
                            <Route exact path="/" component={NotesList}/>
                            <Route exact path="/parse" component={NoteParser}/>
                            <Route exact path="/create" component={NoteCreator}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </Shell>
                </Router>
            </Provider>
        );
    }
}

export default App;
