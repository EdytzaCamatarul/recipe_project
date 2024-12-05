import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import img from '../assets/images/reteta1.png'

function Cards() {
    return (
        <div className='cards'>
            <h1>
                Top Rated Recipes
            </h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src={img}
                            text='tedddddddddddddxt1'
                            label='Autor'
                            path='/reteta1'
                        />
                        <CardItem
                            src={img}
                            text='tedddddddddddddxt1'
                            label='Autor'
                            path='/reteta1'
                        />
                        <CardItem
                            src={img}
                            text='tedddddddddddddxt1'
                            label='Autor'
                            path='/reteta1'
                        />
                    </ul>


                </div>
            </div>
        </div>
    )
}

export default Cards
