import {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import './Results.css'

const MealTile = ({ name, pictureURL, id, mealInfo }) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <div className="meal-tile-container" 
             onClick={() => setShowMore(!showMore)}
             onMouseEnter={() => document.querySelector('.meal-tile-container').style.backgroundColor = '#f5f5f5'}
             onMouseLeave={() => document.querySelector('.meal-tile-container').style.backgroundColor = '#ffffff'}>
            <img className="meal-picture" src={pictureURL} alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
            </div>
            <MoreInfoPopup
                show={showMore}
                info={mealInfo[id]}
                onClose={() => setShowMore(false)}
            />
        </div>
    );
}

const MoreInfoPopup = ({ info, show, onClose }) => {
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{info.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {info.ingredients.map((ing, i) => {
              let name = Object.keys(ing)[0];
              return <li key={i}>{ing[name]} {name}</li>;
            })}
          </ul>
          <a href={info.ytURL}>Recipe Video</a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const Results = (props) => {
    const {meals, mealInfo, hasSearched} = props;
    if (!hasSearched) return <h4 className="text-center">Look up an ingredient to get started.</h4>
    else if (!meals || !mealInfo) return <div>Loading...</div>
    else return(
        <div className="d-flex flex-column align-items-center">
            <h5 className="text-center">{`Showing ${meals.length} Results`} </h5>
            <div className="d-flex flex-wrap justify-content-center">
                {meals.map((meal, i) => {
                    return(
                        <MealTile 
                            name={meal.name}
                            pictureURL={`${meal.pictureURL}/preview`}
                            key={meal.id}
                            id={meal.id}
                            mealInfo={mealInfo}
                        />
                    )
                })}
            </div>
        </div>
    ) 
}


export default Results;