import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import LoadingIndicator from '../UI/LoadingIndicator';
import "./IngredientForm.css";

const IngredientForm = React.memo((props) => {
    // const inputState = useState({ title: "", amount: "" });
    // const [state, setState] = useState({ title: "", amount: "" });
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    const titleRef = useRef();
    const amountRef = useRef();

    // const onAmountChange = (e) => {
    //     inputState.target.setAmount(e.target.value);
    //     console.log(amount);
    // };

    // const onTitleChange = (e) => {
    //     setTitle(e.target.value);
    //     console.log(title);
    // };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAddIngs({title:title, amount:amount});
        setTitle('');
        setAmount('');
        titleRef.current.focus();
        // ...
    };

    return (
        <section className="ingredient-form">
            <Card>
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input
                            ref = {titleRef}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                console.log(e.target.value);
                            }}
                            type="text"
                            id="title"
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="amount">Amount</label>
                        <input
                            ref = {amountRef}
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                console.log(e.target.value);
                            }}
                            type="number"
                            id="amount"
                        />
                    </div>
                    <div className="ingredient-form__actions">
                        <button onClick={submitHandler} type="submit">
                            Add Ingredient
                        </button>
                        {props.loading ? <LoadingIndicator/> : null}
                    </div>
                </form>
            </Card>
        </section>
    );
});

export default IngredientForm;
