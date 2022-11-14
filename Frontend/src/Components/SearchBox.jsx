import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SearchBox = () => {
    const navigate = useNavigate()
  const [keyWord, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault()
    if(keyWord.trim()){
        console.log(keyWord)
       navigate(`/search/${keyWord}`)

    }else{
        navigate('/')

    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
        
      <FormControl
        type="text"
        name="q"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        placeholder="search products..."
        className="me-sm-2 ms-sm-5"
      ></FormControl>
            <Button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        <i className="fa fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
