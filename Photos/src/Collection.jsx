import React from 'react';
import './index.scss';

const Collection = ({ name, images, shiftPhotos }) => {
  return (
    <div className="collection" onClick={() => shiftPhotos(images, 0)}>
      <img className="collection__big" src={images[0]} alt="Item" />
      <div className="collection__bottom">
        <img className="collection__mini" src={images[1]} alt="Item" />
        <img className="collection__mini" src={images[2]} alt="Item" />
        <img className="collection__mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
}

export default Collection;
