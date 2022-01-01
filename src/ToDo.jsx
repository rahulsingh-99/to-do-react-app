import React, { useState } from 'react'
import index from "../src/img/index.svg"
const ToDo = () => {

    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [editItems, setEditItems] = useState(null);


    const addItem = () => {

        if (!inputData) {
            alert('Please Fill the data')
        }

        // This is for edit the notes showing add icon on inputdata and clear the inputdata to looks like previously

        else if (inputData && !toggleSubmit) {
            setItems(
                items.map((elem) => {
                    if (elem.id === editItems) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true)
            setInputData('')
            setEditItems(null);
        }

        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allInputData]);
            setInputData('')
        }
    }
    const deleteItem = (index) => {
        const updatedItem = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updatedItem);
    }

    const editItem = (id) => {
        let newEdit = items.find((elem) => {
            return elem.id === id
        })
        setToggleSubmit(false)

        setInputData(newEdit.name)

        setEditItems(id);
    }

    const removeAll = () => {
        setItems([]);
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={index} alt="todologo" />
                        <figcaption>Add your list here..</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='Add Items...'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)} />
                        {
                            toggleSubmit ? <i class="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i> : <i class="fa fa-edit add-btn" title='Add Item' onClick={addItem}></i>
                        }
                    </div>
                    <div className='showItems'>
                        {
                            items.map((elem) => {
                                return (
                                    <div className='eachItem' key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className='todo-btn'>
                                            <i class="far fa-edit add-btn" title='Edit Item' onClick={() => editItem(elem.id)}></i>
                                            <i class="far fa-trash-alt add-btn" title='Delete Item' onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LISt</span></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ToDo
