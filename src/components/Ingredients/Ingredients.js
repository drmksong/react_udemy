import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
    const [ings, setIngs] = useState([]);

    const addIngs = (ing) => {
        fetch(
            "https://react-song-default-rtdb.asia-southeast1.firebasedatabase.app/ing.json",
            {
                method: "POST",
                body: JSON.stringify(ing),
                header: { "content-type": "application/json" },
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((resdata) => {
                setIngs((prevIngs) => {
                    return [...prevIngs, { id: resdata.name, ...ing }];
                });
            });
    };

    const removeIng = (id) => {
        setIngs((prevIngs) => {
            let _id = id;
            return prevIngs.filter((ig) => _id !== ig.id);
        });
    };

    
    return (
        <div className="App">
            <IngredientForm onAddIngs={addIngs} />

            <section>
                <Search />
                <IngredientList
                    onRemoveItem={removeIng}
                    ingredients={ings}
                ></IngredientList>
                {/* Need to add list here! */}
            </section>
        </div>
    );
}

export default Ingredients;
