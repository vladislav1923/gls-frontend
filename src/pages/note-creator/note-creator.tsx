import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import './note-creator.less';
import Button from "../../components/button/button";

type Props = {}

type State = {}

class NoteCreator extends Component<RouteComponentProps<Props>, State> {

    constructor(props: RouteComponentProps<Props>) {
        super(props);
    }

    public goToNextStep = (): void => {
        this.props.history.push('/group');
    };

    render() {
        return (
            <div>
                <div className="step">
                    <h2>Шаг 2 / Добавление описания ссылки</h2>
                    <span className="sub-header">
                        Проверьте правильность описания страницы, на которую введет ссылка.
                        При необходимости исправьте описание и/или добавьте ссылку в соответствующую группу.
                        По окончанию нажмите кнопку &laquo;Следующий шаг&raquo;	для перехода к выбору группы или
                        &laquo;Назад&raquo; для изменения ссылки.
                    </span>
                    <div className="grid grid-spaceBetween">
                        <div className="col-5_sm-12 mb-32">
                            <label>
                                <span className="label-text mb-16">Заголовок</span>
                                <input type="text" onFocus={() => console.log('hy')}
                                       onChange={() => console.log('hy')}
                                       placeholder="Укажите заголовок"/>
                                {/*<div className="error-label">осибочка</div>*/}
                            </label>
                        </div>
                        <div className="col-5_sm-12 mb-32">
                            <label>
                                <span className="label-text mb-16">Тэги</span>
                                <input type="text" onFocus={() => console.log('hy')}
                                       onChange={() => console.log('hy')}
                                       placeholder="Укажите тэги через запятую"/>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-spaceBetween">
                        <div className="col-5_sm-12 mb-32">
                            <label>
                                <span className="label-text mb-16">Краткое описание</span>
                                <textarea onFocus={() => console.log('hy')}
                                          onChange={() => console.log('hy')} placeholder="Укажите описание">
                                    Description
                                </textarea>
                            </label>
                        </div>
                        <div className="col-5_sm-12 mb-32">
                            <label>
                                <span className="label-text mb-16">Изображение</span>
                                <img src="https://hsto.org/webt/r1/dl/z3/r1dlz3h_pkwcp9mccultduowoxi.jpeg" alt=""/>
                            </label>
                        </div>
                    </div>
                    <div className="grid buttons-block mt-32">
                        <div className="col-6_sm-12">
                            <Button color="gray" size="lg"
                                    onClick={() => console.log('hy')}>
                                <span className="add-link-button-text">Назад</span>
                            </Button>
                        </div>
                        <div className="col-6_sm-12">
                            <Button color="white" size="lg"
                                    onClick={this.goToNextStep}>
                                <span className="add-link-button-text">Следующий шаг</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NoteCreator);
