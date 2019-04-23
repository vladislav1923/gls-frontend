import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createNoteReducer} from './store/create-note.reducer'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faLink, faUserCircle, faPlus, faTimes, faSpinner} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import Shell from "./pages/shell/shell";
import NotesList from './pages/notes-list/notes-list';
import NoteParser from './pages/note-parser/note-parser';
import NoteCreator from './pages/note-creator/note-creator';
import NoteGroup from './pages/note-group/note-group';

library.add(faLink, faUserCircle, faPlus, faTimes, faSpinner, faGithub);

const store = createStore(createNoteReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Shell>
                        <Switch>
                            <Route exact path="/" component={NotesList}/>
                            <Route exact path="/parse" component={NoteParser}/>
                            <Route exact path="/create" component={NoteCreator}/>
                            <Route exact path="/group" component={NoteGroup}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </Shell>
                </Router>
            </Provider>
        );
    }
}

export default App;
