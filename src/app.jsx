/*global $*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactSelect from 'react-select';
import _ from "lodash";
import * as serviceWorker from './serviceWorker';

const CARDS_LIST = ["EM-TRANSITION TO DISCIPLINE", "EM-CORE", "EM-FOUNDATION",
  "EM-TRANSITION TO PRACTICE", "ANESTHESIA",
  "CARDIOLOGY", "INTENSIVE CARE", "GENERAL SURGERY", "GENERAL INTERNAL MEDICINE",
  "NEUROLOGY", "OPTHALMOLOGY", "ORTHOPEDICS", "PLASTIC SURGERY",
  "TOXICOLOGY", "TRAUMA", "OBSETRICS & GYNECOLOGY",
  "PEDIATRIC INTENSIVE CARE", "PSYCHIATRY", "FAMILY MEDICINE", "TRANSPORT MEDICINE"];

//Root sass file for webpack to compile
import './style.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCard: 'EM-TRANSITION TO DISCIPLINE'
    };
    this.onSelectCard = this.onSelectCard.bind(this);
  }

  onSelectCard(selectedOption) {
    this.setState({ selectedCard: selectedOption.value });
  }


  render() {

    //125px to offset the 30px margin on both sides and vertical scroll bar width
    let panelWidth = document.body.getBoundingClientRect().width - 50;

    if (panelWidth > 350) {
      panelWidth = 350;
    }

    let { selectedCard } = this.state, isMulti = false;

    // create a select option label list 
    let cardList = _.map(CARDS_LIST, (card) => {
      return { label: card, value: card }
    });


    let imageName = selectedCard;

    if (imageName == 'EM-TRANSITION TO DISCIPLINE') {
      imageName = 'EM-TTD';
    }
    else if (imageName == 'EM-CORE') {
      imageName = ['EM-C-1', 'EM-C-2', 'EM-C-3'];
      isMulti = true;
    }
    else if (imageName == 'EM-FOUNDATION') {
      imageName = 'EM-F';
    }
    else if (imageName == 'EM-TRANSITION TO PRACTICE') {
      imageName = ['EM-TP-1', 'EM-TP-2'];
      isMulti = true;
    }


    return (
      <div className='card-root-container'>
        <h4>Emergency Medicine Infographic Cards</h4>
        <div className='info-panel-inner'>
          <div className='rotation-select text-center'>
            <div style={{ width: panelWidth }} className='react-select-root'>
              <ReactSelect
                placeholder='Select Rotation...'
                isSearchable={false}
                value={_.find(cardList, (d) => d.value == selectedCard)}
                options={cardList}
                styles={{ option: (styles) => ({ ...styles, color: 'black', textAlign: 'left' }) }}
                onChange={this.onSelectCard} />
            </div>
          </div>
          <div className='image-container'>
            {/* loop only for EM because it has more than 1 card */}
            {isMulti ? <div>{_.map(imageName, (image) =>
              <img style={{ width: panelWidth }} key={image} className='info-card' src={"assets/img/cards/" + image + ".png"} />
            )}</div> :
              <img style={{ width: panelWidth }} className='info-card' src={"assets/img/cards/" + imageName + ".png"} />
            }
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();