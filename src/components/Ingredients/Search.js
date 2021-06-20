import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
    // const { onLoadIngs } = props;
    const [searchKey, setSearchKey] = useState("");
    // const [ings, setIngs] = useState([]);
    useEffect(() => {
        const query = searchKey==='' ? 
        '':
        `?orderBy="title"&equalTo="${searchKey}"`;

        fetch("https://react-song-default-rtdb.asia-southeast1.firebasedatabase.app/ing.json"+query)
            .then((res) => {
                return res.json();
            })
            .then((resData) => {
                let ingData = [];
                for (let key in resData) {
                    ingData.push({
                        id: key,
                        title: resData[key].title,
                        amount: resData[key].amount,
                    });
                    // console.log(key);
                }
                // setIngs(ingData);
                // ingData = ingData.filter((ig) => {
                //     return searchKey===''?true:ig.title === searchKey;
                // });
                props.onLoadIngs(ingData);
                console.log(ingData);

            });
    }, [searchKey]);

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input
                        type="text"
                        value={searchKey}
                        onChange={(e) => {
                            setSearchKey(e.target.value);
                            // let ingData = ings.filter((ig) => {
                            //     return e.target.value===''?true:ig.title === e.target.value;
                            // });
                            // props.onLoadIngs(ingData);
                        }}
                    />
                </div>
            </Card>
        </section>
    );
});

export default Search;
