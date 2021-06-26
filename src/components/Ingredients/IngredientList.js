import React from "react";

import "./IngredientList.css";

const IngredientList = React.memo((props) => {
    return (
        <section className="ingredient-list">
            <h2>Loaded Ingredients</h2>
            <ul>
                {props.ingredients
                    .sort((a, b) => {
                        return a.title.toLowerCase() > b.title.toLowerCase();
                    })
                    .map((ig) => (
                        <li
                            key={ig.id}
                            onClick={props.onRemoveItem.bind(this, ig.id)}
                        >
                            <span>{ig.title}</span>
                            <span>{ig.amount} X </span>
                        </li>
                    ))}
            </ul>
        </section>
    );
});

export default IngredientList;
