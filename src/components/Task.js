import React, { useState, useEffect } from "react";

const getLocalItems = () => {
    let list = localStorage.getItem("list");

    if (list) {
        return JSON.parse(localStorage.getItem("list"));
    } else {
        return [];
    }
};

function Task() {
    const [input, setInput] = useState({
        tname: "",
        tdis: "",
        tdat: "",
        ttim:""
    });

    const [items, setItems] = useState(getLocalItems());
    const [upcoming, setUpcoming] = useState([]);
    const [position, setPosition] = useState("0");
    
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(items));
    }, [items]);
    useEffect(() => {
        localStorage.setItem("upcoming", JSON.stringify(upcoming));
    }, [upcoming]);
    function handleChange(e) {
        const { name, value } = e.target;
        setInput((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    function handleClick(e) {
        setItems((prevItems) => {
            const arr = [...prevItems, input];
            console.log(arr)
            return arr
        });
        e.preventDefault();
        setInput({
            tname: "",
            tdis: "",
            tdat: "",
            ttim:""
        });
    }

    function threeItemClick() {
        let new_array = items.slice(0, 3);
        setPosition("0");
        setUpcoming(new_array);
    }

    function allItemClick() {
        setPosition("1");
        // items.map((ele) => {
        //     console.log(ele);
        // });
    }

    return (
        <div>
            <div className="container">
                <div className="py-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <h3 className="text-center">Task Creator</h3>
                                    <form className="mx-auto needs-validation" style={{ width: "30rem" }} onSubmit={handleClick}>
                                        <div className="mb-3">
                                            <label className="form-label ">Task Name</label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                name="tname"
                                                value={input.tname}
                                                className="form-control"
                                                required
                                                
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Task Description (Optional)
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                type="text"
                                                name="tdis"
                                                value={input.tdis}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Select Date</label>
                                            <input
                                                onChange={handleChange}
                                                type="date"
                                                name="tdat"
                                                value={input.tdat}
                                                className="form-control"
                                                
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Select Time</label>
                                            <input
                                                onChange={handleChange}
                                                type="time"
                                                name="ttim"
                                                value={input.ttim}
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <button
                                            
                                            type="submit"
                                            className="btn btn-primary w-100"
                                        >
                                            Create Task
                                        </button>
                                    </form>
                                </div>

                                <div className="col-md-4 border-start anyClass">
                                    <button
                                        onClick={threeItemClick}
                                        type="submit"
                                        className="btn btn-secondary"
                                    >
                                        Upcoming
                                    </button>
                                    <button
                                        onClick={allItemClick}
                                        type="submit"
                                        className="btn btn-secondary float-end"
                                    >
                                        All
                                    </button>
                                    <div className="overflow-auto"></div>
                                    {position === "1" ? (
                                        <>
                                            {items.map((item, index) => {
                                                return (
                                                    <div key={index} className="tasks">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p>{item.tname}</p> <p>{item.tdis}</p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p >{item.ttim}</p>
                                                                <p>{item.tdat}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    ) : null}
                                    {/* For 3 */}
                                    {position === "0" ? (
                                        <>
                                            {upcoming.map((item, index) => {
                                                return (
                                                    <div key={index} className="tasks">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <p>{item.tname}</p> <p>{item.tdis}</p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p>{item.ttim}</p>
                                                                <p>{item.ttdat}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;



