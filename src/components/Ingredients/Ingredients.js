import React, { useReducer, useCallback,useContext } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import { AuthContext } from "../../Context/Auth-Context";

const ingReducer = (ings, action) => {
    switch (action.type) {
        case "ADD":
            return [...ings, action.ing];
        case "SET":
            return action.ings;
        case "DELETE":
            return ings.filter((ig) => ig.id !== action.id);
        default:
            return ings;
    }
};

const httpReducer = (httpState, action) => {
    switch (action.type) {
        case "SEND":
            return {loading: true, error:null};
        case "RESPONSE":
            return {...httpState, loading:false};
        case "ERROR":
            return {loading:false, error:action.errorMessage};
        case "CLEAR":
            return {loading:false, error:null};
        default:
            throw new Error("Should not get here");
    }
};

function Ingredients() {
    const [ings, dispatch] = useReducer(ingReducer, []);
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null,
    });
    // const [ings, setIngs] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();

    // useEffect(() => {
    //     fetch(
    //         "https://react-song-default-rtdb.asia-southeast1.firebasedatabase.app/ing.json"
    //     )
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((resData) => {
    //             const ingData = [];
    //             for (let key in resData) {
    //                 ingData.push({
    //                     id: key,
    //                     title: resData[key].title,
    //                     amount: resData[key].amount,
    //                 });
    //                 // console.log(key);
    //             }
    //             setIngs(ingData);
    //         });
    // }, []);

    const loadIngs = useCallback((ings) => {
        console.log(ings);
        // setIngs(ings);
        dispatch({ type: "SET", ings: ings });
    });

    const addIngs = (ing) => {
        // setIsLoading(true);
        dispatchHttp({type:'SEND'})
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
                // setIngs((prevIngs) => {
                //     return [...prevIngs, { id: resdata.name, ...ing }];
                // });
                // setIsLoading(false);
                dispatchHttp({type:'RESPONSE'})
                dispatch({ type: "ADD", ing: ing });
            });
    };

    const removeIng = (id) => {
        // setIsLoading(true);
        dispatchHttp({type:'SEND'});
        fetch(
            `https://react-song-default-rtdb.asia-southeast1.firebasedatabase.app/ing/${id}.json`,
            {
                method: "DELETE",
            }
        )
            .then((res) => {
                // setIsLoading(false);
                dispatchHttp({type:'RESPONSE'});
                // setIngs((prevIngs) => {
                //     let _id = id;
                //     return prevIngs.filter((ig) => _id !== ig.id);
                // });
                dispatch({ type: "DELETE", id: id });
                // throw "Error occurred";
            })
            .catch((error) => {
                // setIsLoading(false);
                // setError("something wrong");
                dispatchHttp({type:'ERROR',errorMessage:'Something went wrong!!!'})
            });
    };

    const closeError = () => {
        // setError(null);
        dispatchHttp({type:'CLEAR'})
    };

    const authContext = useContext(AuthContext);

    return (
        <div className="App">
            {httpState.error && <ErrorModal children={httpState.error} onClose={closeError} />}
            <button onClick={authContext.logout}>
                logout
            </button>
            <IngredientForm onAddIngs={addIngs} loading={httpState.loading} />

            <section>
                <Search onLoadIngs={loadIngs} />
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
